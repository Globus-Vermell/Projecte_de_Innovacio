import express from "express";
import supabase from "../../config.js";

// Constante y configuración del srvidor Express
const router = express.Router();

// Ruta para mostrar el formulario de nueva publicación
router.get("/", (req, res) => {
    res.render("publications/publicationsForm");
});

// Ruta para manejar el envío del formulario de nueva publicación
router.post("/", async (req, res) => {
    const { title, description, themes, acknowledgment, publication_edition } = req.body;

    // Validar que los campos obligatorios no estén vacíos
    if (!title || !themes || !publication_edition) {
        return res.status(400).json({
            success: false,
            message: "Els camps title, themes i publication_edition són obligatoris."
        });
    }

    try {
        // Insertar la nueva publicación en la base de datos
        const { error } = await supabase
            .from("publications")
            .insert([
                {
                    title,
                    description: description || null,
                    themes,
                    acknowledgment: acknowledgment || null,
                    publication_edition
                }
            ]);

        if (error) {
            console.error("Error al guardar publicació:", error);
            return res.status(400).json({ success: false, message: "Error al guardar la publicació" });
        }

        return res.json({ success: true, message: "Publicació guardada correctament!" });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, message: "Error intern del servidor" });
    }
});

// Exportar el router para usarlo en index.js
export default router;