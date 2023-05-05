import mongoose, {Schema, Document} from "mongoose";

const UserSchema: Schema<IUser> = new Schema<IUser>({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
});

export interface IUser extends Document {
    email: string;
    password: string;
    isActivated: boolean;
    activationLink?: string;
}

export default mongoose.model<IUser>("User", UserSchema, "users");