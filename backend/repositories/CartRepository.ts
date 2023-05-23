import {Model} from "mongoose";
import {ICart, default as CartModel} from "../models/Cart";

export class CartRepository {
    private readonly cartModel: Model<ICart>;

    constructor() {
        this.cartModel = CartModel;
    }

    public async getAllCarts(): Promise<ICart[]> {
        return this.cartModel.find().exec();
    }

    public async getCartById(id: string): Promise<ICart | null> {
        return this.cartModel.findById(id).exec();
    }

    public async createCart(cart: ICart): Promise<ICart> {
        return this.cartModel.create(cart);
    }

    public async updateCart(id: string, cart: ICart): Promise<ICart | null> {
        return this.cartModel.findByIdAndUpdate(id, cart, {new: true}).exec();
    }

    public async deleteCart(id: string): Promise<ICart | null> {
        return this.cartModel.findByIdAndDelete(id).exec();
    }
}