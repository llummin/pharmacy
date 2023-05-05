import mongoose, {Schema, Document} from "mongoose";

const CategorySchema: Schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
});

export interface ICategory extends Document {
    name: string;
    description: string;
    imageUrl: string;
}

export default mongoose.model<ICategory>("Category", CategorySchema, "categories");