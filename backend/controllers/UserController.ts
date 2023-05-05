import userService from "../services/UserService";

class UserController {
    async registration(request: any, response: any, next: any): Promise<void> {
        try {
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
            console.log(e);
        }
    }

    async login(request: any, response: any, next: any): Promise<void> {
        try {

        } catch (e) {

        }
    }

    async logout(request: any, response: any, next: any): Promise<void> {
        try {

        } catch (e) {

        }
    }

    async activate(request: any, response: any, next: any): Promise<void> {
        try {

        } catch (e) {

        }
    }

    async refresh(request: any, response: any, next: any): Promise<void> {
        try {

        } catch (e) {

        }
    }

    async getUsers(request: any, response: any, next: any): Promise<void> {
        try {
            response.json(['123', '456']);
        } catch (e) {

        }
    }
}

export default new UserController();