import express from "express";
import supabase from "../../config.js";

// Constante y configuración del srvidor Express
const router = express.Router();

// Ruta para mostrar el formulario de nuevo arquitecto
router.get("/", (req, res) => {
    res.render("architects/architectsForm");
});

// Ruta para manejar el envío del formulario de nuevo arquitecto
router.post("/", async (req, res) => {
    const { name, description, birth_year, death_year, nationality } = req.body;

    // Validar que el nombre no esté vacío
    if (!name) {
        return res.status(400).json({ success: false, message: "El nom és obligatori" });
    }

    try {
        // Insertar el nuevo arquitecto en la base de datos
        const { error } = await supabase
            .from("architects")
            .insert([
                {
                    name,
                    description: description || null,
                    birth_year: birth_year || null,
                    death_year: death_year || null,
                    nationality: nationality || null
                }
            ]);

        if (error) {
            console.error("Error al guardar arquitecto", error);
            return res.status(400).json({ success: false, message: "Error al guardar el arquitecto" });
        }

        return res.json({ success: true, message: "Arquitecto guardado correctamente!" });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, message: "Error intern del servidor" });
    }
});

// Exportar el router para usarlo en index.js
export default router;