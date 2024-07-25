// controllers/criminalController.js
import {Criminal} from '../models/mostWanted.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiErrors.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js'


const createCriminal = asyncHandler(async (req, res) => {
  const { criminalName, age, crime, detail } = req.body;


  console.log("Request body:", req.body);

  if (
    [criminalName,age,crime,detail].some(
      (field) => !field || typeof field !== 'string' || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const avatarLocalPath =req.file.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required") //Some bug here
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath)
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required")
}



try{
    const criminal = {
        criminalName,
        age,
        crime,
        detail,
        avatar:avatar.url,
    };

    console.log("Criminal data to be saved:", criminal);

    const createdCriminalData = await Criminal.create(criminal);
    console.log("Criminal Data Created:", createdCriminalData);

    return res.status(201).json(
        new ApiResponse(
            201,
            { criminal: createdCriminalData},
            "Criminal Data Created successfully"
        )
    );
} catch(error){
    console.error("Error creating criminal data:",error);
    return res.status(error.statusCode || 500).json({
        message:error.message || "Internal Server Error"
    });
}
})
    

const getCriminals = asyncHandler(async (req, res) => {
  const criminals = await Criminal.find({});
  res.json(criminals);
});

 
const getCriminalById = asyncHandler(async (req, res) => {
  const criminal = await Criminal.findById(req.params.id);

  if (criminal) {
    res.json(criminal);
  } else {
    res.status(404);
    throw new Error('Criminal not found');
  }
});


const updateCriminal = asyncHandler(async (req, res) => {
  const { criminalName, age, crime, detail, avatar } = req.body;

  const criminal = await Criminal.findById(req.params.id);

  if (criminal) {
    criminal.criminalName = criminalName || criminal.criminalName;
    criminal.age = age || criminal.age;
    criminal.crime = crime || criminal.crime;
    criminal.detail = detail || criminal.detail;

    const updatedCriminal = await criminal.save();
    res.json(updatedCriminal);
  } else {
    res.status(404);
    throw new Error('Criminal not found');
  }
});

const updateCriminalAvatar = asyncHandler(async(req, res) => {
  const avatarLocalPath = req.file?.path

  if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is missing")
  }

  //TODO: delete old image - assignment

  const avatar = await uploadOnCloudinary(avatarLocalPath)

  if (!avatar.url) {
      throw new ApiError(400, "Error while uploading on avatar")
      
  }

  const criminal = await Criminal.findByIdAndUpdate(
      req.criminal?._id,
      {
          $set:{
              avatar: avatar.url
          }
      },
      {new: true}
  ).select("-password")

  return res
  .status(200)
  .json(
      new ApiResponse(200, criminal, "Avatar image updated successfully")
  )
})

const deleteCriminal = asyncHandler(async (req, res) => {
  const criminal = await Criminal.findById(req.params.id);

  if (criminal) {
    await criminal.remove();
    res.json({ message: 'Criminal removed' });
  } else {
    res.status(404);
    throw new Error('Criminal not found');
  }
});

export {
  createCriminal,
  getCriminals,
  getCriminalById,
  updateCriminal,
  updateCriminalAvatar,
  deleteCriminal,
};
