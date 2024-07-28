import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getNewsComments = asyncHandler(async (req, res) => {
    const { newsId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const comments = await Comment.aggregatePaginate(
        Comment.aggregate([{ $match: { newsId: mongoose.Types.ObjectId(newsId) } }]),
        { page, limit }
    );

    res.status(200).json(new ApiResponse(200, comments, "Comments retrieved successfully"));
});

const addComment = asyncHandler(async (req, res) => {
    const { content, newsId } = req.body;
    const ownerId = req.user._id;  // Assuming `req.user` is populated by an authentication middleware

    const comment = await Comment.create({ content, newsId, owner: ownerId });

    res.status(201).json(new ApiResponse(201, comment, "Comment added successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;
    const ownerId = req.user._id;  // Assuming `req.user` is populated by an authentication middleware

    const comment = await Comment.findOneAndUpdate(
        { _id: commentId, owner: ownerId },
        { content },
        { new: true }
    );

    if (!comment) {
        throw new ApiError(404, "Comment not found or not authorized to update");
    }

    res.status(200).json(new ApiResponse(200, comment, "Comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const ownerId = req.user._id;  // Assuming `req.user` is populated by an authentication middleware

    const comment = await Comment.findOneAndDelete({ _id: commentId, owner: ownerId });

    if (!comment) {
        throw new ApiError(404, "Comment not found or not authorized to delete");
    }

    res.status(200).json(new ApiResponse(200, null, "Comment deleted successfully"));
});

export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
};
