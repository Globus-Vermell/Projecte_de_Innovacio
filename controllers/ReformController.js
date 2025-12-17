import { ReformService } from "../services/ReformService.js";

/**
 * Controlador de Reformas
 * Gestiona las operaciones relacionadas con las reformas.
 */
export class ReformController {

    /**
     * Método Index
     * Muestra la lista de reformas.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async index(req, res, next) {
        try {
            const data = await ReformService.getAllReforms(req.query);
            res.render("reforms/index", data);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Método FormCreate
     * Muestra el formulario de creación.
     * Carga datos necesarios para el formulario.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async formCreate(req, res, next) {
        try {
            const data = await ReformService.getCreateFormData();
            res.render("reforms/create", data);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Método Create
     * Guarda una nueva reforma.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async create(req, res, next) {
        try {
            await ReformService.createReform(req.body);
            res.json({ success: true, message: "Reforma guardada correctament!" });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Método FormEdit
     * Muestra el formulario de edición con los datos cargados.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async formEdit(req, res, next) {
        const id = Number(req.params.id);
        try {
            const data = await ReformService.getEditFormData(id);
            res.render('reforms/edit', data);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Método Update
     * Actualiza una reforma existente.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async update(req, res, next) {
        const id = Number(req.params.id);
        try {
            await ReformService.updateReform(id, req.body);
            res.json({ success: true, message: 'Reforma actualitzada correctament!' });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Método Delete
     * Elimina una reforma.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async delete(req, res, next) {
        const id = Number(req.params.id);
        try {
            await ReformService.deleteReform(id);
            res.json({ success: true, message: "Reforma eliminada correctament!" });
        } catch (error) {
            next(error);
        }
    }
}