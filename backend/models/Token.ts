import mongoose, {Schema, Document} from "mongoose";

const TokenSchema: Schema<IToken> = new Schema<IToken>({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true},
});

export interface IToken extends Document {
    user: Schema.Types.ObjectId;
    refreshToken: string;
}

export default mongoose.model<IToken>("Token", TokenSchema, "tokens");