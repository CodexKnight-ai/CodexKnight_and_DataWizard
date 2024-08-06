import { ApiError } from "../utils/ApiErrors.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/users.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // Extract token from cookies or authorization header
        const token = req.cookies?.jwtToken || req.headers["authorization"]?.split(" ")[1];

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

        // Find the user
        const user = await User.findById(decodedToken?._id).select("-password");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        // Attach user to request object
        req.user = decodedToken;
        next();
    } catch (error) {
        // Handle different types of JWT verification errors
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid Token" });
        } else if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token Expired" });
        } else {
            return res.status(401).json({ message: error.message || "Invalid access token" });
        }
    }
});
