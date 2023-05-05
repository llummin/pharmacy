import mongoose, {Schema, Document} from "mongoose";

const RequestSchema: Schema = new Schema({
    manager: {
        type: Schema.Types.ObjectId,
        ref: "Manager",
        required: true,
    },
    medicine: {
        type: Schema.Types.ObjectId,
        ref: "Medicine",
        required: true,
    },
    quantity: {type: Number, required: true},
    status: {
        type: String,
        enum: ["pending", "fulfilled", "cancelled"],
        required: true,
        default: "pending",
    },
});

export interface IRequest extends Document {
    manager: mongoose.Types.ObjectId;
    medicine: mongoose.Types.ObjectId;
    quantity: number;
    status: "pending" | "fulfilled" | "cancelled";
}

export default mongoose.model<IRequest>("MedicineRequest", RequestSchema, "requests");