import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) {
    throw new Error("Local file path is required");
  }

  try {
    // Check if the file exists
    if (!fs.existsSync(localFilePath)) {
      throw new Error("File does not exist at the provided path");
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File is uploaded on cloudinary", response.url);
    return response;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    throw error; // Re-throw the error for further handling
  } finally {
    // Ensure the local file is deleted
    try {
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
    } catch (unlinkError) {
      console.error("Error removing the local file:", unlinkError);
    }
  }
};

export { uploadOnCloudinary };
