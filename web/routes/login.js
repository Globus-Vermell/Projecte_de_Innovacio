import express from "express";
import supabase from "../config.js";


// Constante y configuración del srvidor Express
const router = express.Router();

// Ruta para mostrar el formulario de login
router.get("/", (req, res) => {
    if (req.session?.user) {
        return res.redirect("/home");
    }
    res.render("login", { error: "" });
});

// Ruta para procesar el formulario de login
router.post("/", async (req, res) => {
    const { username, password } = req.body;

    // Validar que se hayan proporcionado usuario y contraseña
    if (!username || !password) {
        return res.render("login", { error: "Debes introducir usuario y contraseña." });
    }

    // Intentar autenticar al usuario
    try {
        const { data: user } = await supabase
            .from("users")
            .select("*")
            .eq("name", username)
            .eq("password", password)
            .maybeSingle();

        if (!user) {
            return res.render("login", { error: "Usuario o contraseña incorrectos." });
        }

        // Guardar la información del usuario en la sesión
        req.session.user = {
            id: user.id_user,
            name: user.name,
            email: user.email,
            level: user.level
        };
        
        // Redirigir al usuario a la página de inicio después de iniciar sesión
        res.redirect("/home");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error interno del servidor");
    }
});

// Ruta para cerrar sesión
router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Error al cerrar sesión:", err);
            return res.status(500).send("Error al tancar sessió");
        }
        res.redirect("/");
    });
});

// Exportar el router para usarlo en index.js
export default router;