import mongoose  from "mongoose";
import { Tbook } from "../types/book.type";


const bookSchema = new mongoose.Schema<Tbook>({


bookName: { 
    type: String , 
    required: true , 

} , 
author: { 
    type: String  , 
    required: true
} , 

coverImage: { 
    type: String  
}
,
file: { 
    type: String , 
    required: true
}



})



const Book = mongoose.model("Book" , bookSchema);

export default Book ; 
