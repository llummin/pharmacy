import {CartRepository} from "../repositories/CartRepository";
import {ICart} from "../models/Cart";

export class CartService {
    private readonly cartRepository: CartRepository;

    constructor() {
        this.cartRepository = new CartRepository();
    }

    public async getAllCarts(): Promise<ICart[]> {
        return this.cartRepository.getAllCarts();
    }

    public async getCartById(id: string): Promise<ICart | null> {
        return this.cartRepository.getCartById(id);
    }

    public async createCart(cart: ICart): Promise<ICart> {
        return this.cartRepository.createCart(cart);
    }

    public async updateCart(id: string, cart: ICart): Promise<ICart | null> {
        return this.cartRepository.updateCart(id, cart);
    }

    public async deleteCart(id: string): Promise<ICart | null> {
        return this.cartRepository.deleteCart(id);
    }
}