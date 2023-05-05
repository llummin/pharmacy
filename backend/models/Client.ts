import mongoose, {Document, Schema} from "mongoose";

const ClientSchema: Schema = new Schema({
    name: String,
    phone: String,
    cart: [{
        item: {type: Schema.Types.ObjectId, ref: 'Medicine'},
        quantity: Number
    }],
    orders: [{
        items: [{
            item: {type: Schema.Types.ObjectId, ref: 'Medicine'},
            quantity: Number
        }],
        totalPrice: Number,
        status: {
            type: String,
            enum: ['created', 'processed', 'delivered']
        }
    }]
});

export interface IClient extends Document {
    name: string;
    phone: string;
    cart: Array<{ item: mongoose.Types.ObjectId, quantity: number }>;
    orders: Array<{
        items: Array<{ item: mongoose.Types.ObjectId, quantity: number }>,
        totalPrice: number,
        status: 'created' | 'processed' | 'delivered'
    }>;
}

export default mongoose.model<IClient>("Client", ClientSchema, "clients");