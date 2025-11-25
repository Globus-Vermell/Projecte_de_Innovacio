import express from "express";
import supabase from "../../config.js";

// Constante y configuración del srvidor Express
const router = express.Router();

// Ruta para mostrar el formulario de nueva protección
router.get("/", (req, res) => {
    res.render("protection/protectionForm");
});

// Ruta para manejar el envío del formulario de nueva protección
router.post("/", async (req, res) => {
    const { level, description } = req.body;

    // Validar que el nivel no esté vacío
    if (!level) {
        return res.status(400).json({ success: false, message: "El nivell és obligatori" });
    }

    try {
        // Insertar la nueva protección en la base de datos
        const { error } = await supabase
            .from("protection")
            .insert([
                {
                    level,
                    description: description
                }
            ]);

        if (error) {
            console.error("Error al guardar protecció:", error);
            return res.status(400).json({ success: false, message: "Error al guardar la protecció" });
        }

        return res.json({ success: true, message: "Protecció guardada correctament!" });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, message: "Error intern del servidor" });
    }
});

// Exportar el router para usarlo en index.js
export default router;