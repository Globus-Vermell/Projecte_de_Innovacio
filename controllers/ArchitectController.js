import { ArchitectService } from "../services/ArchitectService.js";

/**
 * Controlador de Arquitectos
 * Gestiona las operaciones relacionadas con los arquitectos.
 */
export class ArchitectController {

    /**
     * Método Index
     * Muestra la lista de arquitectos.
     * @param {Object} req Petición HTTP 
     * @param {Object} res Respuesta HTTP 
     * @param {Function} next Función Next para manejo de errores
     */
    static async index(req, res, next) {
        try {
            const data = await ArchitectService.getAllArchitects(req.query);
            res.render("architects/index", data);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Método FormCreate
     * Muestra el formulario de creación de arquitecto.
     * @param {Object} req Petición HTTP 
     * @param {Object} res Respuesta HTTP 
     * @param {Function} next Función Next 
     */
    static async formCreate(req, res, next) {
        try {
            res.render("architects/create");
        } catch (error) {
            next(error);
        }
    }

    /**
     * Método Create
     * Crea un nuevo arquitecto.
     * @param {Object} req Petición HTTP 
     * @param {Object} res Respuesta HTTP 
     * @param {Function} next Función Next 
     */
    static async create(req, res, next) {
        try {
            await ArchitectService.createArchitect(req.body);
            res.json({ success: true, message: "Arquitecte guardat correctament!" });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Método FormEdit
     * Muestra el formulario de edición de arquitecto.
     * @param {Object} req Petición HTTP 
     * @param {Object} res Respuesta HTTP 
     * @param {Function} next Función Next 
     */
    static async formEdit(req, res, next) {
        const id = Number(req.params.id);
        try {
            const architect = await ArchitectService.getArchitectById(id);
            res.render("architects/edit", { architect });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Método Update
     * Actualiza un arquitecto existente.
     * @param {Object} req Petición HTTP 
     * @param {Object} res Respuesta HTTP 
     * @param {Function} next Función Next 
     */
    static async update(req, res, next) {
        const id = Number(req.params.id);
        try {
            await ArchitectService.updateArchitect(id, req.body);
            res.json({ success: true, message: "Arquitecte actualitzat correctament!" });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Método Delete
     * Elimina un arquitecto existente.
     * @param {Object} req Petición HTTP 
     * @param {Object} res Respuesta HTTP 
     * @param {Function} next Función Next 
     */
    static async delete(req, res, next) {
        const id = Number(req.params.id);
        try {
            await ArchitectService.deleteArchitect(id);
            res.json({ success: true, message: "Arquitecte eliminat correctament!" });
        } catch (error) {
            next(error);
        }
    }
}