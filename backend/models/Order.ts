import mongoose, {Schema, Document} from "mongoose";

const OrderSchema: Schema = new Schema(
    {
        client: {type: Schema.Types.ObjectId, ref: "Client", required: true},
        items: [
            {
                item: {type: Schema.Types.ObjectId, ref: "Medicine", required: true},
                quantity: {type: Number, required: true},
            },
        ],
        totalPrice: {type: Number, required: true},
        status: {
            type: String,
            enum: ["created", "processed", "delivered"],
            required: true,
            default: "created",
        },
    },
    {
        timestamps: true,
    }
);

export interface IOrder extends Document {
    client: mongoose.Types.ObjectId;
    items: Array<{ item: mongoose.Types.ObjectId; quantity: number }>;
    totalPrice: number;
    status: "created" | "processed" | "delivered";
    createdAt: Date;
    updatedAt: Date;
}

export default mongoose.model<IOrder>("Order", OrderSchema, "orders");