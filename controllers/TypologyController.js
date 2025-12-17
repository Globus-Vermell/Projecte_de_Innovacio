import { TypologyService } from "../services/TypologyService.js";

/**
 * Controlador de Tipologías
 * Gestiona las operaciones relacionadas con las tipologías.
 */
export class TypologyController {

    /**
     * Método Index
     * Muestra la lista de tipologías.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async index(req, res, next) {
        try {
            const typologies = await TypologyService.getAllTypologies(req.query);
            res.render("typologies/index", {
                typologies,
                currentFilters: { search: req.query.search || '' }
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Método FormCreate
     * Muestra el formulario de creación.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async formCreate(req, res, next) {
        try {
            res.render("typologies/create");
        } catch (error) {
            next(error);
        }
    }

    /**
     * Método Create
     * Guarda una nueva tipología.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async create(req, res, next) {
        try {
            await TypologyService.createTypology(req.body);
            res.json({ success: true, message: "Tipologia guardada correctament!" });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Método FormEdit
     * Muestra el formulario de edición.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async formEdit(req, res, next) {
        const id = Number(req.params.id);
        try {
            const typology = await TypologyService.getTypologyById(id);
            res.render('typologies/edit', { typology });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Método Update
     * Actualiza una tipología existente.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async update(req, res, next) {
        const id = Number(req.params.id);
        try {
            await TypologyService.updateTypology(id, req.body);
            res.json({ success: true, message: 'Tipologia actualitzada correctament!' });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Método Delete
     * Elimina una tipología.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async delete(req, res, next) {
        const id = Number(req.params.id);
        try {
            await TypologyService.deleteTypology(id);
            res.json({ success: true, message: "Tipologia eliminada correctament!" });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Método Upload
     * Gestiona la subida de una imagen para la tipología.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async upload(req, res, next) {
        try {
            const publicUrl = await TypologyService.uploadImage(req.file);
            res.json({ success: true, filePath: publicUrl });
        } catch (err) {
            next(err);
        }
    }
}