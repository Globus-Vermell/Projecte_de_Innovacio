import { PrizeService } from "../services/PrizeService.js";

/**
 * Controlador de Premios
 * Gestiona el CRUD de premios.
 */
export class PrizeController {

    /**
     * Método Index
     * Muestra la lista de premios.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async index(req, res, next) {
        try {
            const prizes = await PrizeService.getAllPrizes(req.query);
            res.render("prizes/index", {
                prizes,
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
            res.render("prizes/create");
        } catch (error) {
            next(error);
        }
    }

    /**
     * Método Create
     * Guarda un nuevo premio.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async create(req, res, next) {
        try {
            await PrizeService.createPrize(req.body);
            res.json({ success: true, message: "Premi guardat correctament!" });
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
            const prize = await PrizeService.getPrizeById(id);
            res.render('prizes/edit', { prize });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Método Update
     * Actualiza un premio existente.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async update(req, res, next) {
        const id = Number(req.params.id);
        try {
            await PrizeService.updatePrize(id, req.body);
            res.json({ success: true, message: 'Premi actualitzat correctament!' });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Método Delete
     * Elimina un premio.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async delete(req, res, next) {
        const id = Number(req.params.id);
        try {
            await PrizeService.deletePrize(id);
            res.json({ success: true, message: "Premi eliminat correctament!" });
        } catch (error) {
            next(error);
        }
    }
}