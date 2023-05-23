import {MedicineRepository} from "../repositories/MedicineRepository";
import {IMedicine} from "../models/Medicine";

export class MedicineService {
    private readonly medicineRepository: MedicineRepository;

    constructor() {
        this.medicineRepository = new MedicineRepository();
    }

    public async getAllMedicines(): Promise<IMedicine[]> {
        return this.medicineRepository.getAllMedicines();
    }

    public async getMedicineById(id: string): Promise<IMedicine | null> {
        return this.medicineRepository.getMedicineById(id);
    }

    public async createMedicine(medicine: IMedicine): Promise<IMedicine> {
        return this.medicineRepository.createMedicine(medicine);
    }

    public async updateMedicine(id: string, medicine: IMedicine): Promise<IMedicine | null> {
        return this.medicineRepository.updateMedicine(id, medicine);
    }

    public async deleteMedicine(id: string): Promise<IMedicine | null> {
        return this.medicineRepository.deleteMedicine(id);
    }
}