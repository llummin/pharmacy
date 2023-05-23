import {Request, Response} from "express";
import {CategoryService} from "../services/CategoryService";
import {ICategory} from "../models/Category";

export class CategoryController {
    private readonly categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

    public async getAllCategories(req: Request, res: Response): Promise<void> {
        try {
            const categories: ICategory[] = await this.categoryService.getAllCategories();
            res.json(categories);
        } catch (error) {
            res.status(500).json({error: "Не удалось получить категории!"});
        }
    }

    public async getCategoryById(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const category: ICategory | null = await this.categoryService.getCategoryById(id);
            if (category) {
                res.json(category);
            } else {
                res.status(404).json({error: "Категория не найдена!"});
            }
        } catch (error) {
            res.status(500).json({error: "Не удалось получить категорию!"});
        }
    }

    public async createCategory(req: Request, res: Response): Promise<void> {
        const category: ICategory = req.body;

        try {
            const createdCategory: ICategory = await this.categoryService.createCategory(category);
            res.status(201).json(createdCategory);
        } catch (error) {
            res.status(500).json({error: "Не удалось создать категорию!"});
        }
    }

    public async updateCategory(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        const category: ICategory = req.body;

        try {
            const updatedCategory: ICategory | null = await this.categoryService.updateCategory(id, category);
            if (updatedCategory) {
                res.json(updatedCategory);
            } else {
                res.status(404).json({error: "Категория не найдена!"});
            }
        } catch (error) {
            res.status(500).json({error: "Не удалось обновить категорию!"});
        }
    }

    public async deleteCategory(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const deletedCategory: ICategory | null = await this.categoryService.deleteCategory(id);
            if (deletedCategory) {
                res.json(deletedCategory);
            } else {
                res.status(404).json({error: "Категория не найдена!"});
            }
        } catch (error) {
            res.status(500).json({error: "Не удалось удалить категорию!"});
        }
    }
}