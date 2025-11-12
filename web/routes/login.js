import express from "express";
import supabase from "../config.js";

const router = express.Router();

// GET / — muestra el formulario de login
router.get("/", async (req, res) => {
    try {
        if (req.session?.user) {
            return res.render("login", { username: req.session.user.username });
        }
        res.render("login");
    } catch (error) {
        console.error("Error al mostrar el login:", error);
        res.status(500).send("Error al mostrar la página de login");
    }
});

// POST / — procesa el login
router.post("/", async (req, res) => {
    const { username, password } = req.body || {};

    if (!username || !password) {
        return res.render("login", { error: "Debes introducir usuario y contraseña." });
    }

    try {
        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("name", username)
            .eq("password", password)
            .maybeSingle();

        if (error) {
            console.error("Error al autenticar:", error);
            return res.render("login", { error: "Error al autenticar. Intenta de nuevo." });
        }

        if (!user) {
            return res.render("login", { error: "Usuario o contraseña incorrectos." });
        }

        // Guardar en sesión
        req.session.user = { id: user.id_user, username: user.name, email: user.email };

        // Redirige al home
        res.redirect("/home");
    } catch (err) {
        console.error("Error al procesar el login:", err);
        res.status(500).send("Error interno del servidor");
    }
});

// POST /logout — cierra sesión
router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error al cerrar sesión:", err);
            return res.status(500).send("Error al cerrar sesión");
        }
        res.redirect("/home");
    });
});

export default router;