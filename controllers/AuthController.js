import { AuthService } from "../services/AuthService.js";

/**
 * Controlador de Autenticación
 * Gestiona las operaciones de login y logout.
 */
export class AuthController {

    /**
     * Método LoginForm
     * Muestra el formulario de inicio de sesión.
     * Si el usuario ya tiene sesión, lo redirige al home.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     */
    static async loginForm(req, res) {
        if (req.session?.user) return res.redirect("/home");
        res.render("login", { error: "" });
    }

    /**
     * Método Login
     * Procesa las credenciales y crea la sesión del usuario.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     */
    static async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await AuthService.authenticate(username, password);
            delete user.password; // Eliminamos la contraseña para seguridad
            req.session.user = user;
            res.redirect("/home");
        } catch (error) {
            res.render("login", { error: error.message });
        }
    }

    /**
     * Método Logout
     * Cierra la sesión del usuario y lo redirige al inicio.
     * @param {Object} req Petición HTTP
     * @param {Object} res Respuesta HTTP
     */
    static logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                console.error("Error al tancar sessió:", err);
                return res.status(500).send("Error al tancar sessió");
            }
            res.redirect("/");
        });
    }
}