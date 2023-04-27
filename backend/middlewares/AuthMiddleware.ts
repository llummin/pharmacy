import {NextFunction, Request, Response} from "express";
import ApiError from "../exceptions/ApiError";
import tokenService from "../services/TokenService";
import {JwtPayload} from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: JwtPayload;
}

export default function (request: AuthRequest, response: Response, next: NextFunction) {
    try {
        const authorizationHeader: any = request.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const userData: JwtPayload | any = tokenService.validateAccessToken(accessToken);
        if (userData === null || typeof userData === 'string') {
            return next(ApiError.UnauthorizedError());
        }

        request.user = userData;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};

