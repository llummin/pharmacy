import userModel, {IUser} from '../models/User';
import mailService from '../services/MailService'
import bcrypt from 'bcrypt';
import uuid from 'uuid';

export class UserService {
    public async registration(email: string, password: string): Promise<IUser> {
        const candidate: IUser | null = await userModel.findOne({email});
        if (candidate) {
            throw new Error(`Пользователь с почтовым адресом ${email} уже существует`);
        }
        const hashPassword: string = await bcrypt.hash(password, 7);
        const activationLink: string = uuid.v4();
        const user = await userModel.create({email, password: hashPassword, activationLink});
        await mailService.sendActivationMail(email, activationLink);
        return user;
    }
}

export default new UserService();