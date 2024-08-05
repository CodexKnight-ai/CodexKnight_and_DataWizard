import { ApiError } from "../utils/ApiErrors.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/users.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;

    if (!token) {
      throw new ApiError(401, "No token provided");
    }

    const verifyToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    if (!verifyToken) {
      throw new ApiError(401, "Invalid token");
    }

    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new ApiError(401, "Unauthorized request");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next();
  } catch (error) {
    return res.status(401).json({
      message: error.message || "Invalid access token",
    });
  }
});
