import express from "express";
import supabase from "../../config.js";

// Constante y configuración del srvidor Express
const router = express.Router();

// Ruta para mostrar el formulario de nueva nomenclatura
router.get("/", (req, res) => {
    res.render("nomenclature/nomenclatureForm");
});

// Ruta para manejar el envío del formulario de nueva nomenclatura
router.post("/", async (req, res) => {
    const { name, description } = req.body;
    // Validar que el nombre no esté vacío
    if (!name) {
        return res.status(400).json({ success: false, message: "El nom és obligatori" });
    }

    try {
        // Insertar la nueva nomenclatura en la base de datos
        const { error } = await supabase
            .from("nomenclature")
            .insert([
                {
                    name,
                    description: description
                }
            ]);

        if (error) {
            console.error("Error al guardar nomenclatura:", error);
            return res.status(400).json({ success: false, message: "Error al guardar la nomenclatura" });
        }

        return res.json({ success: true, message: "Nomenclatura guardada correctamente!" });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
});

// Exportar el router para usarlo en index.js
export default router;