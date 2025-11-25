import express from "express";
import supabase from "../../config.js";

// Constante y configuración del srvidor Express
const router = express.Router();

// Ruta para mostrar el formulario de nuevo premio
router.get("/", (req, res) => {
    res.render("prizes/prizesForm");
});

// Ruta para manejar el envío del formulario de nuevo premio
router.post("/", async (req, res) => {
    const { name, tipe, year, description } = req.body;

    // Validar que el nombre no esté vacío
    if (!name) {
        return res.status(400).json({ success: false, message: "El nom és obligatori" });
    }

    try {
        // Insertar el nuevo premio en la base de datos
        const { error } = await supabase
            .from("prizes")
            .insert([
                {
                    name,
                    tipe: tipe,
                    year: parseInt(year),
                    description: description
                }
            ]);

        if (error) {
            console.error("Error al guardar premi:", error);
            return res.status(400).json({ success: false, message: "Error al guardar el premi" });
        }

        return res.json({ success: true, message: "Premi guardat correctament!" });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, message: "Error intern del servidor" });
    }
});

// Exportar el router para usarlo en index.js
export default router;