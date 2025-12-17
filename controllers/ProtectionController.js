import { ProtectionService } from "../services/ProtectionService.js";

/**
 * Controlador de Protecciones Patrimoniales
 * Gestiona las operaciones relacionadas con las protecciones.
 */
export class ProtectionController {

    /**
     * Método Index
     * Muestra la lista de protecciones.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async index(req, res, next) {
        try {
            const protections = await ProtectionService.getAllProtections(req.query);
            res.render("protections/index", {
                protections,
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
     */
    static async formCreate(req, res) {
        res.render("protections/create");
    }

    /**
     * Método Create
     * Guarda una nueva protección.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async create(req, res, next) {
        try {
            await ProtectionService.createProtection(req.body);
            res.json({ success: true, message: "Protecció guardada correctament!" });
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
            const protection = await ProtectionService.getProtectionById(id);
            res.render('protections/edit', { protection });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Método Update
     * Actualiza una protección existente.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async update(req, res, next) {
        const id = Number(req.params.id);
        try {
            await ProtectionService.updateProtection(id, req.body);
            res.json({ success: true, message: 'Protecció actualitzada correctament!' });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Método Delete
     * Elimina una protección.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async delete(req, res, next) {
        const id = Number(req.params.id);
        try {
            await ProtectionService.deleteProtection(id);
            res.json({ success: true, message: "Protecció eliminada correctament!" });
        } catch (error) {
            next(error);
        }
    }
}