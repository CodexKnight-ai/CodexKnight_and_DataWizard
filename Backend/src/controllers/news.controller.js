import { News } from "../models/news.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiErrors.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addNews = asyncHandler(async (req, res) => {
  const { newsHeading, newsDescription } = req.body;
  console.log(req.body);
  if (!newsHeading || !newsDescription || !req.file) {
    throw new ApiError(
      400,
      "All fields are required, including a news image file"
    );
  }
  const newsLocalPath = req.file.path;
  if (!newsLocalPath) {
    throw new ApiError(400, "News Image file is required");
  }
  const newsPic = await uploadOnCloudinary(newsLocalPath);
  if (!newsPic) {
    throw new ApiError(400, "News Image file is required");
  }

  try {
    const news = {
      newsHeading,
      newsDescription,
      newsImage: newsPic.url,
    };
    console.log("News data to be saved", news);

    const createdNewsData = await News.create(news);
    console.log("News Data Created:", createdNewsData);
    return new ApiResponse(
      200,
      createdNewsData,
      "News Data created successfully"
    );
  } catch (error) {
    console.error("Error creating news data:", error);
    return new ApiError(500, "Internal server error in creating news data");
  }
});
const getNews = asyncHandler(async (req, res) => {
  const news = await News.find({});
  res.json(news);
});

const getNewsById = asyncHandler(async (req, res) => {
  try {
    const newsId = req.params.id;
    const news = await News.findById(newsId);
    res.json(news);
    return new ApiResponse(200, "News data by id sent");
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while sending new data by id",
      error
    );
  }
});

const likeNews = asyncHandler(async (req, res, next) => {
  try {
    const newsId = req.params.id;
    const userId = req.user._id;

    const updatedNews = await News.findByIdAndUpdate(
      newsId,
      { $addToSet: { likes: userId } }, // Ensures user can only like once
      { new: true }
    );

    if (!updatedNews) {
      return next(new ApiError(404, "News not found"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, updatedNews, "News liked successfully"));
  } catch (error) {
    next(new ApiError(500, "Internal server error while liking news", error));
  }
});

const unlikeNews = asyncHandler(async (req, res, next) => {
  try {
    const newsId = req.params.id;
    const userId = req.user._id;

    const updatedNews = await News.findByIdAndUpdate(
      newsId,
      { $pull: { likes: userId } }, 
      { new: true }
    );

    if (!updatedNews) {
      return next(new ApiError(404, "News not found"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, updatedNews, "News unliked successfully"));
  } catch (error) {
    next(new ApiError(500, "Internal server error while unliking news", error));
  }
});
const addComment = asyncHandler(async (req, res, next) => {
  try {
    const newsId = req.params.id;
    const { content } = req.body;

    if (!content) {
      return next(new ApiError(400, "Comment content is required"));
    }

    const comment = {
      user: req.user._id,
      content,
    };

    const updatedNews = await News.findByIdAndUpdate(
      newsId,
      { $push: { comments: comment } },
      { new: true }
    ).populate("comments.user", "name"); // Populate user field to get user details

    if (!updatedNews) {
      return next(new ApiError(404, "News not found"));
    }

    res.status(201).json(new ApiResponse(201, updatedNews, "Comment added successfully"));
  } catch (error) {
    next(new ApiError(500, "Internal server error while adding comment", error));
  }
});

// const editComment = asyncHandler(async (req, res, next) => {
//   try {
//     const newsId = req.params.newsId;
//     const commentId = req.params.commentId;
//     const { content } = req.body;

//     if (!content) {
//       return next(new ApiError(400, "Comment content is required"));
//     }

//     const news = await News.findById(newsId);
//     if (!news) {
//       return next(new ApiError(404, "News not found"));
//     }

//     const comment = news.comments.id(commentId);
//     if (!comment) {
//       return next(new ApiError(404, "Comment not found"));
//     }

//     // Ensure that the comment belongs to the user
//     if (comment.user.toString() !== req.user._id.toString()) {
//       return next(new ApiError(403, "You do not have permission to edit this comment"));
//     }

//     comment.content = content;

//     await news.save();
//     res.status(200).json(new ApiResponse(200, news, "Comment updated successfully"));
//   } catch (error) {
//     next(new ApiError(500, "Internal server error while editing comment", error));
//   }
// });
const deleteComment = asyncHandler(async (req, res, next) => {
  try {
    const newsId = req.params.newsId;
    const commentId = req.params.commentId;

    const news = await News.findById(newsId);
    if (!news) {
      return next(new ApiError(404, "News not found"));
    }

    const comment = news.comments.id(commentId);
    if (!comment) {
      return next(new ApiError(404, "Comment not found"));
    }

    // Ensure that the comment belongs to the user or the user is an admin
    if (comment.user.toString() !== req.user._id.toString() ) {
      return next(new ApiError(403, "You do not have permission to delete this comment"));
    }

    comment.remove();
    await news.save();

    res.status(200).json(new ApiResponse(200, news, "Comment deleted successfully"));
  } catch (error) {
    next(new ApiError(500, "Internal server error while deleting comment", error));
  }
});
const getComments = asyncHandler(async (req, res, next) => {
  try {
    const newsId = req.params.id;

    const news = await News.findById(newsId).populate("comments.user", "name");
    if (!news) {
      return next(new ApiError(404, "News not found"));
    }

    res.status(200).json(new ApiResponse(200, news.comments, "Comments fetched successfully"));
  } catch (error) {
    next(new ApiError(500, "Internal server error while fetching comments", error));
  }
});



export { addNews, getNews, getNewsById,likeNews,unlikeNews,addComment,editComment,deleteComment,getComments };
