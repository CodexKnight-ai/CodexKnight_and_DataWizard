import { Career } from "../models/career.model.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import asyncHandler from "../utils/asyncHandler.js";
import e from "express";

const createCareer = asyncHandler(async (req, res) => {
    const {careerTitle,careerQualification,careerJob,careerSalary, careerDescription } = req.body;
    console.log("Career Request Body:", req.body);

    // Check if all required fields are present
    if (
        [careerTitle,careerQualification,careerJob,careerSalary, careerDescription].some(
            (field) => !field || field.trim() === ""
        )
    ) {
        throw new ApiError(400, "All career fields are required");
    }
    console.log(req.file)
    // Handle file upload
    const careerImageLocalPath = req.file.path;
    //Some bug here
    if (!careerImageLocalPath) {
        console.log("Career image is:",careerImageLocalPath)
        throw new ApiError(400, "Career Image is required");
    }

    // Upload image to Cloudinary
    const uploadedImage = await uploadOnCloudinary(careerImageLocalPath);
    if (!uploadedImage || !uploadedImage.url) {
        console.log("Uploading at cloudinary")
        throw new ApiError(400, "Error uploading Career Image");
    }

    try {
        // Prepare career data
        const career = {
            careerTitle,
            careerQualification,
            careerJob,
            careerSalary,
            careerDescription,

            careerImage: uploadedImage.url, // Use the URL from Cloudinary
        };

        console.log("Career data to be saved:", career);

        // Save career to database
        const createdCareerData = await Career.create(career);
        console.log("Career Data created:", createdCareerData);

        return res.status(201).json(
            new ApiResponse(
                201,
                { career: createdCareerData },
                "Career Data created successfully"
            )
        );
    } catch (error) {
        console.error("Error creating career data:", error);
        return res.status(error.statusCode || 500).json({
            message: error.message || "Internal Server Error"
        });
    }
});
const getCareer = asyncHandler(async (req, res) => {
    const career = await Career.find({});
    res.json(career);
  });

const deleteCareer = asyncHandler(async(req,res)=>{
    const career= await Career.findById(req.params.id);
    if(career){
        await Career.findByIdAndDelete(req.params.id);
        new ApiResponse(200, career,"Career choice removed")
    }
    else{
        throw new ApiError(404,"career choice not found")
    }
})
  

export {
    createCareer,
    getCareer,
    deleteCareer,
};
