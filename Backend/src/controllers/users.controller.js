import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { User } from "../models/users.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Function to generate access and refresh tokens
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");
    
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access tokens"
    );
  }
};

// Function to handle user signup
const SignupUser = asyncHandler(async (req, res) => {
  const { username, email, phoneNumber, password } = req.body;

  // Log the request body for debugging
  console.log("Request body:", req.body);

  if (
    [username, email, phoneNumber, password].some(
      (field) => !field || typeof field !== 'string' || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required and must be non-empty strings");
  }

  // Check if user with the same username, email, or phone number already exists
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

    // Log user data before saving
    console.log("User data to be saved:", user);

    const createdUser = await User.create(user);

    // Verify the user was created successfully
    console.log("User created:", createdUser);

    return res.status(201).json(
      new ApiResponse(
        201,
        { user: createdUser },
        "User signed up successfully"
      )
    );
    
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error"
    });
  }
});

// Function to handle user login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({ email });
  
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }
  
  const isPasswordValid = await user.validatePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set to true in production
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});
const logoutUser = asyncHandler(async(req, res) => {
  await User.findByIdAndUpdate(
      req.user._id,
      {
          $unset: {
              refreshToken: 1 // this removes the field from document
          }
      },
      {
          new: true
      }
  )

  const options = {
      httpOnly: true,
      secure: true
  }

  return res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(new ApiResponse(200, {}, "User logged Out"))
})

export { SignupUser, loginUser,logoutUser };
