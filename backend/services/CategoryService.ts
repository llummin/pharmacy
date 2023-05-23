import {CategoryRepository} from "../repositories/CategoryRepository";
import {ICategory} from "../models/Category";

export class CategoryService {
    private readonly categoryRepository: CategoryRepository;

    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    public async getAllCategories(): Promise<ICategory[]> {
        return this.categoryRepository.getAllCategories();
    }

    public async getCategoryById(id: string): Promise<ICategory | null> {
        return this.categoryRepository.getCategoryById(id);
    }

    public async createCategory(category: ICategory): Promise<ICategory> {
        return this.categoryRepository.createCategory(category);
    }

    public async updateCategory(id: string, category: ICategory): Promise<ICategory | null> {
        return this.categoryRepository.updateCategory(id, category);
    }

    public async deleteCategory(id: string): Promise<ICategory | null> {
        return this.categoryRepository.deleteCategory(id);
    }
}