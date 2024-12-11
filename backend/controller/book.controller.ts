import { Request, Response, NextFunction } from "express";
import path from "node:path";
import fs from "node:fs";
import Book from "../model/book.model";
import { uploadOnCloudinary } from "../config/Cloudinary";
import createHttpError from "http-errors";

export const addBook = async (req: Request, res: Response, next: NextFunction) => {
  let coverImagePath = "";
  let filePath = "";

  try {
    const { bookName, author } = req.body;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    if (!files || !files.coverImage || !files.file) {
      throw createHttpError(400, "Required files are missing");
    }

    const coverImageFile = files.coverImage[0];
    const file = files.file[0];

    // Set file paths
    coverImagePath = path.resolve(
      __dirname,
      "../public/data/uploads",
      coverImageFile.filename
    );
    filePath = path.resolve(__dirname, "../public/data/uploads", file.filename);

    // Check if files exist locally
    await fs.promises.access(coverImagePath).catch(() => {
      throw createHttpError(400, `Cover image not found at path: ${coverImagePath}`);
    });

    await fs.promises.access(filePath).catch(() => {
      throw createHttpError(400, `File not found at path: ${filePath}`);
    });

    // Upload to Cloudinary
    const coverImageResponse = await uploadOnCloudinary({
      localPath: coverImagePath,
      fileName: coverImageFile.filename,
      folder: "coverImages",
      format: coverImageFile.mimetype.split("/").at(-1),
    });

    const fileResponse = await uploadOnCloudinary({
      localPath: filePath,
      fileName: file.filename,
      folder: "pdfs",
      format: file.mimetype.split("/").at(-1),
    });

    if (!coverImageResponse || !fileResponse) {
      throw createHttpError(500, "Error uploading files to Cloudinary");
    }

    // Save to database
    const newBook = new Book({
      bookName,
      author,
      coverImage: coverImageResponse.secure_url,
      file: fileResponse.secure_url,
    });

    await newBook.save();

    res.status(201).json({
      success: true,
      message: "Book added successfully!",
      data: newBook,
    });
  } catch (error) {
    next(error);
  } finally {
    // Cleanup local files
    if (coverImagePath) {
      fs.promises.unlink(coverImagePath).catch((err) =>
        console.error(`Error deleting cover image: ${err.message}`)
      );
    }
    if (filePath) {
      fs.promises.unlink(filePath).catch((err) =>
        console.error(`Error deleting file: ${err.message}`)
      );
    }
  }
};
