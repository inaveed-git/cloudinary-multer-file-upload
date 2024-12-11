

import { Request  , Response , NextFunction } from "express"
import { HttpError } from "http-errors"

const globalErrorHandler = (err: HttpError , req: Request  ,res: Response , next: NextFunction) => { 

const statusCode = err.statusCode || 500 ; 
const message = err.message || "unexpected error occur" ; 


res.status(statusCode).json({
    success: false , 
    statusCode , 
    message , 
    errorStack: process.env.NODE_ENV == "developement" ? err.stack : undefined 
})


}


export default globalErrorHandler;