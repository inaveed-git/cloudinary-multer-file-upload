import express from 'express';
import { addBook } from '../controller/book.controller';
import { upload } from '../middleware/multer.middleware';

const bookRouter = express.Router();


bookRouter.post("/add/book" ,upload.fields(
    [
        {name: "coverImage" , maxCount: 1} , 
        {name: "file" , maxCount: 1}
    ]
) ,  addBook);



export default bookRouter ; 
