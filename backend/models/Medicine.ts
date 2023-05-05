import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MedicineSchema = new Schema({
    name: {type: String, required: true},
    category: {type: Schema.Types.ObjectId, ref: "Category", required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    imageUrl: {type: String, required: true},
});

export interface IMedicine {
    name: string;
    category: mongoose.Types.ObjectId;
    description: string;
    price: number;
    imageUrl: string;
}

export const Medicine = mongoose.model<IMedicine>("Medicine", MedicineSchema, "medicines");