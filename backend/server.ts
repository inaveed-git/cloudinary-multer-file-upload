import express from "express" ; 
import { config } from "dotenv";
config()
const app = express() ; 
import connectDB from "./config/connectDB";

import globalErrorHandler from "./middleware/globalError.middleware";
import createHttpError from "http-errors";


import bookRouter from "./routes/book.route";
connectDB()


app.use("/api"  , bookRouter)
// /api/add/book

const PORT = process.env.PORT || 3000 ; 


app.listen(PORT , ()=> { 
console.log(`The server is running on the port: ${PORT}`)
})

app.use((req , res , next)=> { 
    next(createHttpError(404 , "page not found"))
})

app.use(globalErrorHandler)