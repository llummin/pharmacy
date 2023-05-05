import userModel, {IUser} from '../models/User';
import mailService from '../services/MailService'
import tokenService from "./TokenService";
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';

export class UserService {
    public async registration(email: string, password: string) {
        const candidate: IUser | null = await userModel.findOne({email});
        if (candidate) {
            throw new Error(`Пользователь с почтовым адресом ${email} уже существует`);
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
        const tokens: { accessToken: string; refreshToken: string } = tokenService.generateTokens(userObject);
        await tokenService.saveToken(userObject.userId, tokens.refreshToken);

        return {user: userObject, tokens};
    }
}

export default new UserService();