import { News } from "../models/news.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiErrors.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addNews = asyncHandler(async (req, res) => {
  const { newsHeading, newsDescription} = req.body;
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
export { addNews,getNews };
