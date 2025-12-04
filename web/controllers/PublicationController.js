import { PublicationModel } from "../models/PublicationModel.js";
import { TypologyModel } from "../models/TypologyModel.js";
import { AppError } from "../utils/AppError.js";

export class PublicationController {

    static async index(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 15;

            // Recogemos filtros
            const filters = {
                search: req.query.search || '',
                validated: req.query.validated || 'all'
            };

            const result = await PublicationModel.getAll(page, limit, filters);

            res.render("publications/publications", {
                publications: result.data,
                pagination: result,
                currentFilters: filters
            });
        } catch (error) {
            next(error);
        }
    }

    static async formEdit(req, res, next) {
        const id = Number(req.params.id);

        try {
            const publication = await PublicationModel.getById(id);
            if (!publication) {
                return next(new AppError('Publicació no trobada', 404));
            }

            const allTypologies = await TypologyModel.getAll();
            const currentTypologies = await PublicationModel.getTypologiesByPublication(id);

            res.render('publications/publicationsEdit', {
                publication,
                typologies: allTypologies || [],
                currentTypologies
            });

        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        const id = Number(req.params.id);
        const { title, description, themes, acknowledgment, publication_edition, selectedTypologies } = req.body;

        try {
            const pubData = {
                title,
                description,
                themes,
                acknowledgment,
                publication_edition
            };
            const typeIds = selectedTypologies ? (Array.isArray(selectedTypologies) ? selectedTypologies : [selectedTypologies]) : [];

            await PublicationModel.update(id, pubData, typeIds);

            res.json({ success: true, message: 'Publicació actualitzada correctament!' });
        } catch (err) {
            next(err);
        }
    }

    static async formCreate(req, res, next) {
        try {
            const allTypologies = await TypologyModel.getAll();
            res.render('publications/publicationsForm', {
                typologies: allTypologies || []
            });
        } catch (err) {
            next(err);
        }
    }

    static async create(req, res, next) {
        const { title, description, themes, acknowledgment, publication_edition, selectedTypologies } = req.body;

        if (!title || !themes || !publication_edition) {
            return next(new AppError("Els camps title, themes i publication_edition són obligatoris.", 400));
        }

        try {
            const pubData = {
                title,
                description,
                themes,
                acknowledgment,
                publication_edition
            };
            const typeIds = selectedTypologies ? (Array.isArray(selectedTypologies) ? selectedTypologies : [selectedTypologies]) : [];

            await PublicationModel.create(pubData, typeIds);

            res.json({ success: true, message: 'Publicació creada correctament!' });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        const id = Number(req.params.id);

        try {
            await PublicationModel.delete(id);
            return res.json({ success: true, message: "Publicación eliminada correctament!" });
        } catch (error) {
            next(error);
        }
    }

    static async validation(req, res, next) {
        const id = Number(req.params.id);
        const { validated } = req.body;

        try {
            await PublicationModel.updateValidation(id, validated);
            res.json({ success: true, message: 'Estat de validació actualitzat correctament!' });
        } catch (err) {
            next(err);
        }
    }
}