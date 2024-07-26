import {v2 as cloudinary} from "cloudinary";
import fs from "fs";


// import {v2 as cloudinary} from 'cloudinary';
import { response } from "express";
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null;
        //upload file in cloudinary
         const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto",
         })
         //file added successfully
         console.log("File uploaded successfully",resource.url);
         return response
    }catch (error) {
        fs.unlikeSync(localFilePath);//remove from the file
        return null; 

    }
}
export {uploadOnCloudinary}