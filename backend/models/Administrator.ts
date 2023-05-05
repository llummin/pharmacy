import mongoose, {Schema, Document} from "mongoose";

const AdministratorSchema: Schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
});

export interface IAdministrator extends Document {
    name: string;
    email: string;
    password: string;
    phone: string;
}

export default mongoose.model<IAdministrator>("Administrator", AdministratorSchema, "administrators");