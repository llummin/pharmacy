import {Model} from "mongoose";
import Category, {ICategory} from "../models/Category";

export class CategoryRepository {
    private readonly categoryModel: Model<ICategory>;

    constructor() {
        this.categoryModel = Category;
    }

    public async getAllCategories(): Promise<ICategory[]> {
        return this.categoryModel.find().exec();
    }

    public async getCategoryById(id: string): Promise<ICategory | null> {
        return this.categoryModel.findById(id).exec();
    }

    public async createCategory(category: ICategory): Promise<ICategory> {
        return this.categoryModel.create(category);
    }

    public async updateCategory(id: string, category: ICategory): Promise<ICategory | null> {
        return this.categoryModel.findByIdAndUpdate(id, category, {new: true}).exec();
    }

    public async deleteCategory(id: string): Promise<ICategory | null> {
        return this.categoryModel.findByIdAndDelete(id).exec();
    }
}