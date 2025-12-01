import express from "express";
import { ProtectionModel } from "../../models/ProtectionModel.js";

// Constante y configuración del servidor Express
const router = express.Router();

// Ruta para mostrar el formulario de nueva protección
router.get("/", (req, res) => {
    res.render("protection/protectionForm");
});

// Ruta para manejar el envío del formulario de nueva protección
router.post("/", async (req, res) => {
    // Obtenemos los datos del formulario
    const { level, description } = req.body;

    // Validamos que el nivel no esté vacío
    if (!level) {
        return res.status(400).json({ success: false, message: "El nivell és obligatori" });
    }

    // Insertamos la nueva protección
    try {
        await ProtectionModel.create({
            level,
            description
        });

        return res.json({ success: true, message: "Protecció guardada correctament!" });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Error intern del servidor" });
    }
});

// Exportar el router para usarlo en index.js
export default router;