import { ArchitectModel } from "../models/ArchitectModel.js";
import { AppError } from "../utils/AppError.js";

export class ArchitectController {

    static async index(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 15;

            // Recogemos el texto de búsqueda de la URL
            const filters = {
                search: req.query.search || ''
            };

            // Se lo pasamos al modelo
            const result = await ArchitectModel.getAll(page, limit, filters);

            res.render("architects/architects", {
                architects: result.data,
                pagination: result,
                currentFilters: filters
            });
        } catch (error) {
            next(error);
        }
    }

    static async formCreate(req, res, next) {
        res.render("architects/architectsForm");
    }

    static async create(req, res, next) {
        const { name, description, birth_year, death_year, nationality } = req.body;

        if (!name) {
            return next(new AppError("El nom és obligatori", 400));
        }

        try {
            await ArchitectModel.create({
                name,
                description: description || null,
                birth_year: birth_year || null,
                death_year: death_year || null,
                nationality: nationality || null
            });

            return res.json({ success: true, message: "Arquitecte guardat correctament!" });
        } catch (err) {
            next(err);
        }
    }

    static async formEdit(req, res, next) {
        const id = Number(req.params.id);
        try {
            const architect = await ArchitectModel.getById(id);
            if (!architect) {
                return next(new AppError("Arquitecte no trobat", 404));
            }
            res.render("architects/architectsEdit", { architect });
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        const id = Number(req.params.id);
        const { name, description, birth_year, death_year, nationality } = req.body;

        try {
            await ArchitectModel.update(id, {
                name,
                description: description || null,
                birth_year: birth_year || null,
                death_year: death_year || null,
                nationality: nationality || null
            });

            return res.json({ success: true, message: "Arquitecte actualitzat correctament!" });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        const id = Number(req.params.id);
        try {
            await ArchitectModel.delete(id);
            return res.json({ success: true, message: "Arquitecte eliminat correctament!" });
        } catch (error) {
            next(error);
        }
    }
}