import {Request, Response} from "express";
import {CartService} from "../services/CartService";
import {ICart} from "../models/Cart";

export class CartController {
    private readonly cartService: CartService;

    constructor() {
        this.cartService = new CartService();
    }

    public async getAllCarts(req: Request, res: Response): Promise<void> {
        try {
            const carts: ICart[] = await this.cartService.getAllCarts();
            res.json(carts);
        } catch (error) {
            res.status(500).json({error: "Не удалось получить корзины"});
        }
    }

    public async getCartById(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const cart: ICart | null = await this.cartService.getCartById(id);
            if (cart) {
                res.json(cart);
            } else {
                res.status(404).json({error: "Корзина не найдена!"});
            }
        } catch (error) {
            res.status(500).json({error: "Не удалось получить корзину!"});
        }
    }

    public async createCart(req: Request, res: Response): Promise<void> {
        const cart: ICart = req.body;

        try {
            const createdCart: ICart = await this.cartService.createCart(cart);
            res.status(201).json(createdCart);
        } catch (error) {
            res.status(500).json({error: "Не удалось создать корзину!"});
        }
    }

    public async updateCart(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        const cart: ICart = req.body;

        try {
            const updatedCart: ICart | null = await this.cartService.updateCart(id, cart);
            if (updatedCart) {
                res.json(updatedCart);
            } else {
                res.status(404).json({error: "Корзина не найдена!"});
            }
        } catch (error) {
            res.status(500).json({error: "Не удалось обновить корзину!"});
        }
    }

    public async deleteCart(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const deletedCart: ICart | null = await this.cartService.deleteCart(id);
            if (deletedCart) {
                res.json(deletedCart);
            } else {
                res.status(404).json({error: "Корзина не найден!"});
            }
        } catch (error) {
            res.status(500).json({error: "Не удалось удалить корзину!"});
        }
    }
}