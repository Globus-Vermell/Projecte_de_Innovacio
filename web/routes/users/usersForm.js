import express from "express";
import { UserModel } from "../../models/UserModel.js";

// Constante y configuración del srvidor Express
const router = express.Router();

// Ruta para mostrar el formulario de nuevo usuario
router.get("/", (req, res) => {
    res.render("users/usersForm");
});

// Ruta para manejar el envío del formulario de nuevo usuario
router.post("/", async (req, res) => {
    // Obtenemos los datos del formulario
    const { name, email, password, confirmPassword, level } = req.body;

    // Validamos que los campos obligatorios no estén vacíos
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Nom, email i contrasenya són obligatoris"
        });
    }

    // Validamos que las contraseñas coincidan
    if (password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Les contrasenyes no coincideixen"
        });
    }

    try {
        // Creamos el usuario
        await UserModel.create({
            name,
            email,
            password,
            level
        });

        return res.json({ success: true, message: "Usuari creat correctament!" });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, message: "Error intern del servidor" });
    }
});

// Exportar el router para usarlo en index.js
export default router;