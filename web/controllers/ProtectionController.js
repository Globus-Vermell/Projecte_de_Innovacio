import { ProtectionModel } from "../models/ProtectionModel.js";
import { AppError } from "../utils/AppError.js";

export class ProtectionController {
    static async index(req, res, next) {
        try {
            const filters = { search: req.query.search || '' };
            const protections = await ProtectionModel.getAll(filters);
            res.render("protection/protection", { protections, currentFilters: filters });
        } catch (error) {
            next(error);
        }
    }

    static async formCreate(req, res, next) {
        res.render("protection/protectionForm");
    }

    static async create(req, res, next) {
        const { level, description } = req.body;

        if (!level) {
            return next(new AppError("El nivell és obligatori", 400));
        }

        try {
            await ProtectionModel.create({
                level,
                description
            });

            return res.json({ success: true, message: "Protecció guardada correctament!" });
        } catch (err) {
            next(err);
        }
    }

    static async formEdit(req, res, next) {
        const id = Number(req.params.id);
        try {
            const protection = await ProtectionModel.getById(id);
            if (!protection) {
                return next(new AppError('Protecció no trobada', 404));
            }
            res.render('protection/protectionEdit', { protection });
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        const id = Number(req.params.id);
        const { level, description } = req.body;
        try {
            await ProtectionModel.update(id, { level, description });
            res.json({ success: true, message: 'Protecció actualitzada correctament!' });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        const id = Number(req.params.id);
        try {
            await ProtectionModel.delete(id);
            return res.json({ success: true, message: "Protecció eliminada correctament!" });
        } catch (error) {
            next(error);
        }
    }
}