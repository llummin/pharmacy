import userService from "../services/UserService";
import {validationResult} from "express-validator";
import ApiError from "../exceptions/ApiError";

class UserController {
    public async registration(request: any, response: any, next: any): Promise<void> {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, password} = request.body;
            const userData: {
                tokens: { accessToken: string; refreshToken: string };
                user: { isActivated: any; userId: string; email: any }
            } = await userService.registration(email, password);

            response.cookie('refreshToken', userData.tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true
            })

            return response.json(userData);
        } catch (e) {
            next(e);
        }
    }

    public async login(request: any, response: any, next: any): Promise<void> {
        try {
            const {email, password} = request.body;
            const userData: {
                tokens: { accessToken: string; refreshToken: string };
                user: { isActivated: any; userId: string; email: any }
            } = await userService.login(email, password);

            response.cookie('refreshToken', userData.tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true
            })

            return response.json(userData);
        } catch (e) {
            next(e);
        }
    }

    public async logout(request: any, response: any, next: any): Promise<void> {
        try {

        } catch (e) {
            next(e);
        }
    }

    public async activate(request: any, response: any, next: any): Promise<void> {
        try {
            const activationLink = request.params.link;
            await userService.activate(activationLink);
            return response.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }

    public async refresh(request: any, response: any, next: any): Promise<void> {
        try {

        } catch (e) {
            next(e);
        }
    }

    async getUsers(request: any, response: any, next: any): Promise<void> {
        try {
            response.json(['123', '456']);
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();