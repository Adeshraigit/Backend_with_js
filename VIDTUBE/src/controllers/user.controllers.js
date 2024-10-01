import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/users.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
 
const registerUser   = asyncHandler( async (req, res) => {
    const { fullName, email, username, password } = req.body

    // validation
    // if(fullName?.trim() === ""){
    //     throw new ApiError(400, "All fields are required")
    // }
    if(
        [fullName, email, username, password].some((field) => field.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser =await User.findOne({ 
        $or: [
            { email },
            { username }    
        ]
     });

    if(existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    let coverImage = "";
    if(coverLocalPath) {
        coverImage = await uploadOnCloudinary(coverImage)
    }

    const user = await User.create({
        fullName,
        email,
        username: username.toLowerCase(),
        password,
        avatar: avatar?.url,
        coverImage: coverImage?.url
    });

    const createdUser = await User.findOne(user._id).select("-password -refreshToken");

    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while creating user");
    }

    return res
    .status(201)
    .json(
        new ApiResponse(200,createdUser, "User created successfully")
    )

})


export { 
    registerUser 
}
