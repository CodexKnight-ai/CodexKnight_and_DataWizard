import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { User } from "../models/users.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from 'jsonwebtoken'; // Ensure you have this import

const SignupUser = asyncHandler(async (req, res) => {
  const { username, email, phoneNumber, password } = req.body;

  if (
    [username, email, phoneNumber, password].some(
      (field) => !field || typeof field !== "string" || field.trim() === ""
    )
  ) {
    throw new ApiError(
      400,
      "All fields are required and must be non-empty strings"
    );
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }, { phoneNumber }],
  });

  if (existingUser) {
    throw new ApiError(
      409,
      "User with email, username, or phone number already exists"
    );
  }

  try {
    const user = {
      email,
      password,
      username: username.toLowerCase().trim(),
      phoneNumber,
    };

    const createdUser = await User.create(user);

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { user: createdUser },
          "User signed up successfully"
        )
      );
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid credentials");
    }

    const jwtToken = jwt.sign(
      {
        email: user.email,
        _id: user._id,
      },
      process.env.JWT_TOKEN_SECRET,
      {
        expiresIn: process.env.JWT_TOKEN_EXPIRY,
      }
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Ensure secure cookies in production
    };

    return res
      .status(200)
      .cookie("jwtToken", jwtToken, options) 
      .json({
        jwtToken,
        user
      }
        )
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Ensure secure cookies in production
  };

  return res
    .status(200)
    .clearCookie("jwtToken", options) // Consistent cookie name
    .json(new ApiResponse(200, {}, "User logged out"));
});

const getUser = asyncHandler(async (req, res) => {
  const userId = req.params._id;

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  const userById = await User.findById(userId);

  if (!userById) {
    throw new ApiError(404, "User not found");
  }

  res.json(
    new ApiResponse(200, { user: userById }, "User fetched successfully")
  );
});

export { SignupUser, loginUser, logoutUser, getUser };
