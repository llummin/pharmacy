import {Request, Response} from "express";
import {MedicineService} from "../services/MedicineService";
import {IMedicine} from "../models/Medicine";

export class MedicineController {
    private readonly medicineService: MedicineService;

    constructor() {
        this.medicineService = new MedicineService();
    }

    public async getAllMedicines(req: Request, res: Response): Promise<void> {
        try {
            const medicines: IMedicine[] = await this.medicineService.getAllMedicines();
            res.json(medicines);
        } catch (error) {
            res.status(500).json({error: "Не удалось получить лекарства!"});
        }
    }

    public async getMedicineById(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const medicine: IMedicine | null = await this.medicineService.getMedicineById(id);
            if (medicine) {
                res.json(medicine);
            } else {
                res.status(404).json({error: "Лекарство не найдено!"});
            }
        } catch (error) {
            res.status(500).json({error: "Не удалось получить лекарство!"});
        }
    }

    public async createMedicine(req: Request, res: Response): Promise<void> {
        const medicine: IMedicine = req.body;

        try {
            const createdMedicine: IMedicine = await this.medicineService.createMedicine(medicine);
            res.status(201).json(createdMedicine);
        } catch (error) {
            res.status(500).json({error: "Не удалось создать лекарство!"});
        }
    }

    public async updateMedicine(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        const medicine: IMedicine = req.body;

        try {
            const updatedMedicine: IMedicine | null = await this.medicineService.updateMedicine(id, medicine);
            if (updatedMedicine) {
                res.json(updatedMedicine);
            } else {
                res.status(404).json({error: "Лекарство не найдено!"});
            }
        } catch (error) {
            res.status(500).json({error: "Не удалось обновить лекарство!"});
        }
    }

    public async deleteMedicine(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const deletedMedicine: IMedicine | null = await this.medicineService.deleteMedicine(id);
            if (deletedMedicine) {
                res.json(deletedMedicine);
            } else {
                res.status(404).json({error: "Лекарство не найдено!"});
            }
        } catch (error) {
            res.status(500).json({error: "Не удалось удалить лекарство!"});
        }
    }
}