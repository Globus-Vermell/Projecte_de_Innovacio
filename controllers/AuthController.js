import { AuthService } from "../services/AuthService.js";

export class AuthController {
    static async loginForm(req, res) {
        if (req.session?.user) return res.redirect("/home");
        res.render("login", { error: "" });
    }

    static async login(req, res) {
        try {
            const { username, password } = req.body;

            const user = await AuthService.authenticate(username, password);

            req.session.user = user;
            res.redirect("/home");
        } catch (error) {

            res.render("login", { error: error.message });
        }
    }

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