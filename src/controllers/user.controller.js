import { asyncHandler } from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {apiResponse} from "../utils/apiResponse.js"
const registerUser = asyncHandler(async(req,res) =>{
    res.status(200).json({
        message: "ok"
    })

    const {fullname,email,username,password} = req.body
    console.log("email ",email);

    // if(fullName === ""){
    //     throw new apiError(400,"fullname is required")
    // }
    if(
        [fullname,email,username,password].some((field) => field?.trim() === "")
    ){
        throw new apiError(400,"All feilds are required")

        }
        const existedUser = await User.findOne({
            $or: [{username},{email}]
        })
        console.log("existed User",existedUser)

        if(existedUser) {
            throw new apiError(409, "user with email or username")
        }

        const avatarpath = req.files?.avatar[0]?.path
        // const coverImagepath = req.files?.coverImage[0]?.path;

 
        let coverImagepath;
        if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
            coverImagepath = req.files.coverImage[0].path
        }
        console.log("avatar path",avatarpath)

        if(!avatarpath){
            throw new apiError(400,"Avatr file is required");
        }
        const avatar = await uploadOnCloudinary(avatarpath)
        const coverImage = await uploadOnCloudinary(coverImagepath)

        if(!avatar){
            throw new apiError(400,"Avatr file is required");
        }
        const user = await User.create({
            fullname,
            avatar:avatar.url,
            coverImage:coverImage?.url || "",
            email,
            password,
            username:username.toLowerCase()
        })
    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if(!createdUser){
        throw new apiError(500,"Something went wronge while redistering the user")
    }
    return res.status(201).json(
        new apiResponse(200,createdUser,"User register successfully")
)

})
export {registerUser}