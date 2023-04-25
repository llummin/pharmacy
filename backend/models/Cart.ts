import mongoose, {Document, Schema} from "mongoose";

const CartSchema: Schema = new Schema({
	client: {type: Schema.Types.ObjectId, ref: 'Client', required: true},
	items: [{
		item: {type: Schema.Types.ObjectId, ref: 'Medicine'},
		quantity: {type: Number, required: true}
	}],
});

export interface ICart extends Document {
	client: mongoose.Types.ObjectId;
	items: Array<{ item: mongoose.Types.ObjectId, quantity: number }>;
}

export default mongoose.model<ICart>("Cart", CartSchema, "carts");