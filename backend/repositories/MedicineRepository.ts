import {Model} from "mongoose";
import {Medicine, IMedicine} from "../models/Medicine";

export class MedicineRepository {
    private readonly medicineModel: Model<IMedicine>;

    constructor() {
        this.medicineModel = Medicine;
    }

    public async getAllMedicines(): Promise<IMedicine[]> {
        return this.medicineModel.find().exec();
    }

    public async getMedicineById(id: string): Promise<IMedicine | null> {
        return this.medicineModel.findById(id).exec();
    }

    public async createMedicine(medicine: IMedicine): Promise<IMedicine> {
        return this.medicineModel.create(medicine);
    }

    public async updateMedicine(id: string, medicine: IMedicine): Promise<IMedicine | null> {
        return this.medicineModel.findByIdAndUpdate(id, medicine, {new: true}).exec();
    }

    public async deleteMedicine(id: string): Promise<IMedicine | null> {
        return this.medicineModel.findByIdAndDelete(id).exec();
    }
}