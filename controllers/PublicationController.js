import { PublicationService } from "../services/PublicationService.js";

/**
 * Controlador de Publicaciones
 * Gestiona las operaciones relacionadas con las publicaciones.
 */
export class PublicationController {

    /**
     * Método Index
     * Muestra la lista de publicaciones.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async index(req, res, next) {
        try {
            const data = await PublicationService.getAllPublications(req.query);
            res.render("publications/index", data);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Método FormCreate
     * Muestra el formulario de creación y carga las tipologías disponibles.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async formCreate(req, res, next) {
        try {
            const typologies = await PublicationService.getAllTypologies();
            res.render('publications/create', { typologies });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Método Create
     * Guarda una nueva publicación.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async create(req, res, next) {
        try {
            await PublicationService.createPublication(req.body);
            res.json({ success: true, message: 'Publicació creada correctament!' });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Método FormEdit
     * Muestra el formulario de edición.
     * Carga en paralelo los datos de la publicación y las tipologías.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async formEdit(req, res, next) {
        const id = Number(req.params.id);
        try {
            const [data, typologies] = await Promise.all([
                PublicationService.getPublicationDataForEdit(id),
                PublicationService.getAllTypologies()
            ]);

            res.render('publications/edit', {
                publication: data.publication,
                currentTypologies: data.currentTypologies,
                typologies: typologies || []
            });

        } catch (err) {
            next(err);
        }
    }

    /**
     * Método Update
     * Actualiza una publicación existente.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async update(req, res, next) {
        const id = Number(req.params.id);
        try {
            await PublicationService.updatePublication(id, req.body);
            res.json({ success: true, message: 'Publicació actualitzada correctament!' });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Método Delete
     * Elimina una publicación.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async delete(req, res, next) {
        const id = Number(req.params.id);
        try {
            await PublicationService.deletePublication(id);
            return res.json({ success: true, message: "Publicació eliminada correctament!" });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Método Validate
     * Actualiza el estado de validación de la publicación.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async validate(req, res, next) {
        const id = Number(req.params.id);
        const { validated } = req.body;
        try {
            await PublicationService.validatePublication(id, validated);
            res.json({ success: true, message: 'Estat de validació actualitzat correctament!' });
        } catch (err) {
            next(err);
        }
    }
}