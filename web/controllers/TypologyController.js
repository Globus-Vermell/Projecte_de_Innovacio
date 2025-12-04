import { TypologyModel } from "../models/TypologyModel.js";
import supabase from "../config.js";
import { AppError } from "../utils/AppError.js";

export class TypologyController {
    static async index(req, res, next) {
        try {
            const filters = { search: req.query.search || '' };
            const typologies = await TypologyModel.getAll(filters);
            res.render("typology/typology", { typologies, currentFilters: filters });
        } catch (error) {
            next(error);
        }
    }

    static async formCreate(req, res, next) {
        res.render("typology/typologyForm");
    }

    static async create(req, res, next) {
        const { name, image } = req.body;

        if (!name) {
            return next(new AppError("El nom és obligatori", 400));
        }

        try {
            await TypologyModel.create({ name, image });
            return res.json({ success: true, message: "Tipologia guardada correctament!" });
        } catch (err) {
            next(err);
        }
    }

    static async formEdit(req, res, next) {
        const id = Number(req.params.id);
        try {
            const typology = await TypologyModel.getById(id);
            res.render('typology/typologyEdit', { typology });
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        const id = Number(req.params.id);
        const { name, image } = req.body;

        try {
            await TypologyModel.update(id, { name, image });
            res.json({ success: true, message: 'Tipologia actualitzada correctament!' });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        const id = Number(req.params.id);
        try {
            await TypologyModel.delete(id);
            return res.json({ success: true, message: "Tipologia eliminada correctament!" });
        } catch (error) {
            next(error);
        }
    }

    static async upload(req, res, next) {
        if (!req.file) {
            return next(new AppError("No s'ha pujat cap fitxer.", 400));
        }

        try {
            const cleanName = req.file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
            const fileName = `${Date.now()}_${cleanName}`;

            const { error } = await supabase.storage
                .from('images')
                .upload(`typologies/${fileName}`, req.file.buffer, {
                    contentType: req.file.mimetype
                });

            if (error) throw error;

            const { data } = supabase.storage
                .from('images')
                .getPublicUrl(`typologies/${fileName}`);

            res.json({ success: true, filePath: data.publicUrl });

        } catch (err) {
            next(err);
        }
    }
}