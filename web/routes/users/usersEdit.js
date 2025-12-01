import express from "express";
import { UserModel } from "../../models/UserModel.js";

// Constante y configuración del srvidor Express
const router = express.Router();

// Ruta para obtener un usuario por ID para editar
router.get("/:id", async (req, res) => {
    // Obtenemos el id del usuario
    const id = Number(req.params.id);

    try {
        // Obtenemos el usuario
        const user = await UserModel.getById(id);
        res.render("users/usersEdit", { user });
    } catch (error) {
        console.error("Error obtenint usuari:", error);
        return res.status(404).send("Usuari no trobat");
    }
});

// Ruta para actualizar un usuario
router.put("/:id", async (req, res) => {
    // Obtenemos el id del usuario
    const id = Number(req.params.id);
    // Obtenemos los datos del usuario
    const { name, email, password, level } = req.body;

    try {
        // Actualizamos el usuario
        await UserModel.update(id, {
            name,
            email,
            password,
            level
        });

        return res.json({ success: true, message: "Usuari actualitzat correctament!" });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, message: "Error intern del servidor" });
    }
});

// Exportar el router para usarlo en index.js
export default router;