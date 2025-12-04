import { ReformModel } from "../models/ReformModel.js";
import { ArchitectModel } from "../models/ArchitectModel.js";
import { AppError } from "../utils/AppError.js";

export class ReformController {
    static async index(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 15;
            const filters = { search: req.query.search || '' };
            const result = await ReformModel.getAll(page, limit, filters);

            res.render("reform/reform", {
                reformas: result.data,
                pagination: result,
                currentFilters: filters
            });
        } catch (error) {
            next(error);
        }
    }

    static async formCreate(req, res, next) {
        try {
            const architects = await ArchitectModel.getAll(null, null);
            res.render("reform/reformForm", { architects: architects.data || [] });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        const { year, id_architect } = req.body;

        if (!id_architect) {
            return next(new AppError("L'arquitecte és obligatori", 400));
        }

        try {
            await ReformModel.create({
                year: parseInt(year),
                id_architect: parseInt(id_architect)
            });

            return res.json({ success: true, message: "Reforma guardada correctament!" });
        } catch (err) {
            next(err);
        }
    }

    static async formEdit(req, res, next) {
        const id = Number(req.params.id);

        try {
            const reform = await ReformModel.getById(id);

            if (!reform) {
                return next(new AppError('Reforma no trobada', 404));
            }

            const architects = await ArchitectModel.getAll(null, null);

            res.render('reform/reformEdit', { reform, architects: architects.data });
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        const id = Number(req.params.id);

        const { year, id_architect } = req.body;

        try {
            await ReformModel.update(id, {
                year: parseInt(year),
                id_architect: parseInt(id_architect)
            });

            res.json({ success: true, message: 'Reforma actualitzada correctament!' });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        const id = Number(req.params.id);

        try {
            await ReformModel.delete(id);
            return res.json({ success: true, message: "Reforma eliminada correctament!" });
        } catch (error) {
            next(error);
        }
    }
}