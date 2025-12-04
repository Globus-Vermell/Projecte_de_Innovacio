import { PrizeModel } from "../models/PrizeModel.js";
import { AppError } from "../utils/AppError.js";

export class PrizeController {
    static async index(req, res, next) {
        try {
            const filters = { search: req.query.search || '' };
            const prizes = await PrizeModel.getAll(filters);
            res.render("prizes/prizes", { prizes, currentFilters: filters });
        } catch (error) {
            next(error);
        }
    }

    static async formCreate(req, res, next) {
        res.render("prizes/prizesForm");
    }

    static async create(req, res, next) {
        const { name, tipe, year, description } = req.body;

        if (!name) {
            return next(new AppError("El nom és obligatori", 400));
        }
        try {
            await PrizeModel.create({
                name,
                tipe,
                year: parseInt(year),
                description
            });

            return res.json({ success: true, message: "Premi guardat correctament!" });
        } catch (err) {
            next(err);
        }
    }

    static async formEdit(req, res, next) {
        const id = Number(req.params.id);
        try {
            const prize = await PrizeModel.getById(id);
            if (!prize) {
                return next(new AppError("Premi no trobat", 404));
            }
            res.render('prizes/prizesEdit', { prize });
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        const id = Number(req.params.id);
        const { name, tipe, year, description } = req.body;

        try {
            await PrizeModel.update(id, {
                name,
                tipe,
                year: year ? parseInt(year) : null,
                description
            });

            res.json({ success: true, message: 'Premi actualitzat correctament!' });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        const id = Number(req.params.id);
        try {
            await PrizeModel.delete(id);
            return res.json({ success: true, message: "Premi eliminat correctament!" });
        } catch (error) {
            next(error);
        }
    }
}