import userService from "../services/UserService";
import {validationResult} from "express-validator";
import ApiError from "../exceptions/ApiError";
import {NextFunction, Request, Response} from "express";

class UserController {
    public async registration(request: Request, response: Response, next: NextFunction) {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, password} = request.body;
            const userData = await userService.registration(email, password);

            response.cookie('refreshToken', userData.tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            })

            return response.json(userData);
        } catch (e) {
            next(e);
        }
    }

    public async login(request: Request, response: Response, next: NextFunction) {
        try {
            const {email, password} = request.body;
            const userData = await userService.login(email, password);

            response.cookie('refreshToken', userData.tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            })

            return response.json(userData);
        } catch (e) {
            next(e);
        }
    }

    public async logout(request: Request, response: Response, next: NextFunction) {
        try {
            const {refreshToken} = request.cookies;
            const token = await userService.logout(refreshToken);
            response.clearCookie('refreshToken');
            return response.json(token);
        } catch (e) {
            next(e);
        }
    }

    public async activate(request: Request, response: Response, next: NextFunction) {
        try {
            const activationLink: string = request.params.link;
            if (!activationLink) {
                return next(ApiError.BadRequest('Ссылка на активацию не передана'));
            }
            await userService.activate(activationLink);

            if (!process.env.CLIENT_URL) {
                return next(ApiError.BadRequest('Не указан URL клиента'));
            }

            return response.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }

    public async refresh(request: Request, response: Response, next: NextFunction) {
        try {
            const {refreshToken} = request.cookies;
            const userData: any = await userService.refresh(refreshToken);

            response.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            })

            return response.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getUsers(request: Request, response: Response, next: NextFunction) {
        try {
            const users = await userService.getAllUsers();
            return response.json(users);
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();