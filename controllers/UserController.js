import { UserService } from "../services/UserService.js";

/**
 * Controlador de Usuarios
 * Gestiona las operaciones relacionadas con los usuarios.
 */
export class UserController {

    /**
     * Método Index
     * Muestra la lista de usuarios.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async index(req, res, next) {
        try {
            const data = await UserService.getAllUsers(req.query);
            res.render("users/index", data);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Método FormCreate
     * Muestra el formulario de creación de usuario.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async formCreate(req, res, next) {
        res.render('users/create');
    }

    /**
     * Método Create
     * Crea un nuevo usuario.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async create(req, res, next) {
        try {
            await UserService.createUser(req.body);
            res.json({ success: true, message: "Usuari creat correctament!" });
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
            const user = await UserService.getUserById(id);
            res.render('users/edit', { user });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Método Update
     * Actualiza un usuario existente.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async update(req, res, next) {
        const id = Number(req.params.id);
        try {
            await UserService.updateUser(id, req.body);
            res.json({ success: true, message: "Usuari actualitzat correctament!" });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Método Delete
     * Elimina un usuario.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     * @param {Function} next Función Next
     */
    static async delete(req, res, next) {
        const id = Number(req.params.id);
        try {
            await UserService.deleteUser(id);
            res.json({ success: true, message: "Usuari eliminat correctament!" });
        } catch (error) {
            next(error);
        }
    }
}