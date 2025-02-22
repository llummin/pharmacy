import userModel, {IUser} from '../models/User';
import mailService from '../services/MailService'
import tokenService from "./TokenService";
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';
import ApiError from "../exceptions/ApiError";

export class UserService {
    public async registration(email: string, password: string) {
        const candidate: IUser | null = await userModel.findOne({email});
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
        }

        const hashPassword: string = await bcrypt.hash(password, 7);
        const activationLink: string = uuid();

        const user = await userModel.create({email, password: hashPassword, activationLink});
        await mailService.sendActivationMail(email, `${process.env.API_URL}/activate/${activationLink}`);

        const userObject: { isActivated: any; userId: string; email: any } = {
            userId: user._id.toString(),
            email: user.email,
            isActivated: user.isActivated
        };
        const tokens = tokenService.generateTokens(userObject);
        await tokenService.saveToken(userObject.userId, tokens.refreshToken);

        return {tokens, user: userObject};
    }

    public async activate(activationLink: any): Promise<void> {
        const user = await userModel.findOne({activationLink});
        if (!user) {
            throw ApiError.BadRequest('Неккоректная ссылка активации');
        }
        user.isActivated = true;
        await user.save();
    }

    public async login(email: string, password: string) {
        const user = await userModel.findOne({email});
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userObject: { isActivated: any; userId: string; email: any } = {
            userId: user._id.toString(),
            email: user.email,
            isActivated: user.isActivated
        };
        const tokens = tokenService.generateTokens(userObject);
        await tokenService.saveToken(userObject.userId, tokens.refreshToken);

        return {user: userObject, tokens};
    }

    async logout(refreshToken: string) {
        return await tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        const user = typeof userData === 'object' ? await userModel.findById(userData.id) : null;
        const userObject: { isActivated: any; userId: string; email: any } = {
            userId: user?._id.toString(),
            email: user?.email,
            isActivated: user?.isActivated
        };
        const tokens = tokenService.generateTokens(userObject);
        await tokenService.saveToken(userObject.userId, tokens.refreshToken);

        return {tokens, user: userObject};
    }

    async getAllUsers() {
        return userModel.find();
    }
}

export default new UserService();