import { v2 as cloudinary } from "cloudinary";

import { Tcloudinary } from "../types/book.type";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



// Utility function to upload a file to Cloudinary
const uploadOnCloudinary = async (data: Tcloudinary) => {


  try {
    if (!data.localPath) throw new Error("Invalid file path provided");

 

    // Prepare the upload options
    const options = {
      resource_type: data.resource_type || "auto", // Specify resource type (image, video, etc.)
      filename_override: data.fileName, // Custom file name
      folder: data.folder, // Upload folder
      format: data.format, // Optional: enforce a specific format
    };

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(data.localPath, options);

    console.log("File uploaded to Cloudinary:", response.secure_url);

    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    // Clean up temporary files on error


    return null;
  }
};

export { uploadOnCloudinary };
