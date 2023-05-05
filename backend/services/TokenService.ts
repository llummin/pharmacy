import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import tokenModel, {IToken} from "../models/Token";

dotenv.config();

interface ITokenPayload {
    userId: string;
}

export class TokenService {
    generateTokens(payload: ITokenPayload): { accessToken: string, refreshToken: string } {
        if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
            throw new Error('JWT_ACCESS_SECRET и JWT_REFRESH_SECRET не определены');
        }

        const accessToken: string = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refreshToken: string = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            accessToken,
            refreshToken
        };
    }

    async saveToken(userId: string, refreshToken: string): Promise<IToken> {
        const tokenData = await tokenModel.findOne({user: userId});

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        return await tokenModel.create({user: userId, refreshToken});
    }
}

export default new TokenService();