import ApiError from "../exceptions/ApiError";
import {Request, Response} from "express";

export default function errorHandler(error: ApiError | Error, request: Request, response: Response) {
    console.log(error);
    if (error instanceof ApiError) {
        return response.status(error.status).json({message: error.message, errors: error.errors})
    }
    return response.status(500).json({message: 'Непредвиденная ошибка'})
}