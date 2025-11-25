import express from "express";
import supabase from "../../config.js";

// Constante y configuración del srvidor Express
const router = express.Router();

// Ruta para mostrar el formulario de nueva reforma
router.get("/", (req, res) => {
    res.render("reform/reformForm");
});

// Ruta para obtener la lista de arquitectos para el formulario
router.get("/architects", async (req, res) => {
    const { data, error } = await supabase
        .from("architects")
        .select("id_architect, name");

    if (error) return res.status(500).json([]);
    res.json(data || []);
});

// Ruta para manejar el envío del formulario de nueva reforma
router.post("/", async (req, res) => {
    const { year, id_architect } = req.body;

    // Validar que el arquitecto no esté vacío
    if (!id_architect) {
        return res.status(400).json({ success: false, message: "L'arquitecte és obligatori" });
    }

    try {
        // Insertar la nueva reforma en la base de datos
        const { error } = await supabase
            .from("reform")
            .insert([
                {
                    year: parseInt(year),
                    id_architect: parseInt(id_architect)
                }
            ]);

        if (error) {
            console.error("Error al guardar reforma:", error);
            return res.status(400).json({ success: false, message: "Error al guardar la reforma" });
        }

        return res.json({ success: true, message: "Reforma guardada correctament!" });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, message: "Error intern del servidor" });
    }
});

// Exportar el router para usarlo en index.js
export default router;