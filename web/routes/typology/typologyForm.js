import express from "express";
import supabase from "../../config.js";
import multer from "multer";

// Configuración de multer
const upload = multer({ dest: 'public/images/buildings' });

const router = express.Router();

// Ruta para mostrar el formulario de nueva tipología
router.get("/", (req, res) => {
    res.render("typology/typologyForm");
});

// Ruta auxiliar para subir la imagen al crear
router.post("/upload", upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No s'ha pujat cap fitxer." });
    }
    const filePath = `/images/buildings/${req.file.filename}`;
    res.json({ success: true, filePath });
});

// Ruta para manejar el envío del formulario
router.post("/", async (req, res) => {
    const { name, image } = req.body;

    // Validar que el nombre no esté vacío
    if (!name) {
        return res.status(400).json({ success: false, message: "El nom és obligatori" });
    }

    try {
        // Insertar la nueva tipología en la base de datos
        const { error } = await supabase
            .from("typology")
            .insert([{ name, image: image }]);

        // Validar que la inserción se haya realizado correctamente
        if (error) {
            console.error("Error al guardar tipologia:", error);
            return res.status(400).json({ success: false, message: "Error al guardar la tipologia" });
        }

        return res.json({ success: true, message: "Tipologia guardada correctament!" });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, message: "Error intern del servidor" });
    }
});

export default router;