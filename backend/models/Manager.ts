import mongoose, {Schema, Document} from "mongoose";

const ManagerSchema: Schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
});

export interface IManager extends Document {
    name: string;
    email: string;
    password: string;
    phone: string;
}

export default mongoose.model<IManager>("Manager", ManagerSchema, "managers");