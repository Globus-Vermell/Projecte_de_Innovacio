import express from "express";
import supabase from "../../config.js";


// Constante y configuración del srvidor Express
const router = express.Router();


// Middleware para verificar si el usuario es Admin o no
function isAdmin(req, res, next) {
    // Si no hay sesión de usuario, redirigir al inicio de sesión
    if (!req.session?.user) {
        return res.redirect("/");
    }

    // Si el usuario no es Admin, denegar el acceso
    if (req.session.user.level !== "Admin") {
        return res.status(403).send("Accés denegat. Només Admins poden accedir aquí.");
    }

    next();
}

// Ruta para obtener todos los usuarios
router.get("/", isAdmin, async (req, res) => {
    const { data: users, error } = await supabase
        .from("users")
        .select("*");

    if (error) {
        console.error("Error al obtener usuarios:", error);
        return res.status(500).send("Error al obtener usuarios");
    }

    res.render("users/users", { users });
});

// Ruta para eliminar un usuario
router.delete("/delete/:id", isAdmin, async (req, res) => {
    const id = Number(req.params.id);

    const { error } = await supabase
        .from("users")
        .delete().eq("id_user", id);

    if (error) {
        console.error("Error borrando usuario:", error);
        return res.status(500).json({ success: false, message: "Error al borrar l'usuari." });
    }

    return res.json({ success: true, message: "Usuari eliminat correctament!" });
});

// Exportar el router para usarlo en index.js
export default router;