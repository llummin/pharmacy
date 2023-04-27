import jwt, {Secret} from 'jsonwebtoken';
import tokenModel, {IToken} from "../models/Token";

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

    validateAccessToken(accessToken: string) {
        try {
            return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as Secret);
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(refreshToken: string) {
        try {
            return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as Secret);
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId: string, refreshToken: string): Promise<IToken> {
        const tokenData = await tokenModel.findOne({user: userId});

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        return await tokenModel.create({user: userId, refreshToken});
    }

    async removeToken(refreshToken: string) {
        return tokenModel.deleteOne({refreshToken});
    }

    async findToken(refreshToken: string) {
        return tokenModel.findOne({refreshToken});
    }
}

export default new TokenService();