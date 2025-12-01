import express from "express";
import { UserModel } from "../../models/UserModel.js";

// Constante y configuración del srvidor Express
const router = express.Router();

// Middleware para verificar si el usuario es Admin o no
function isAdmin(req, res, next) {
    if (!req.session?.user) {
        return res.redirect("/");
    }

    if (req.session.user.level !== "Admin") {
        return res.status(403).send("Accés denegat. Només els administradors poden accedir aquí.");
    }

    next();
}

// Ruta para obtener todos los usuarios
router.get("/", isAdmin, async (req, res) => {
    try {
        // Obtenemos todos los usuarios
        const users = await UserModel.getAll();
        res.render("users/users", { users });
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).send("Error en obtenir usuaris");
    }
});

// Ruta para eliminar un usuario
router.delete("/delete/:id", isAdmin, async (req, res) => {
    // Obtenemos el id del usuario
    const id = Number(req.params.id);

    try {
        // Eliminamos el usuario
        await UserModel.delete(id);
        return res.json({ success: true, message: "Usuari eliminat correctament!" });
    } catch (error) {
        console.error("Error borrando usuario:", error);
        return res.status(500).json({ success: false, message: "Error a l'esborrar l'usuari." });
    }
});

// Exportar el router para usarlo en index.js
export default router;