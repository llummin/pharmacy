import ApiError from "../exceptions/ApiError";

export default function errorHandler(error: any, request: any, response: any) {
    console.log(error);
    if (error instanceof ApiError) {
        return response.status(error.status).json({message: error.message, errors: error.errors})
    }
    return response.status(500).json({message: 'Непредвиденная ошибка'})
}