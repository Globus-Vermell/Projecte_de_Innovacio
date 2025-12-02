import express from "express";
import multer from "multer";
import supabase from '../../config.js';
import { TypologyModel } from "../../models/TypologyModel.js";

// Configuración de multer
const upload = multer({ storage: multer.memoryStorage() });
// Constante y configuración del servidor Express
const router = express.Router();

// Ruta para mostrar el formulario de nueva tipología
router.get("/", (req, res) => {
    res.render("typology/typologyForm");
});

// Ruta auxiliar para subir la imagen al crear
router.post("/upload", upload.single('image'), async (req, res) => {
    // Validamos que se haya subido un archivo
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No s'ha pujat cap fitxer." });
    }

    try {
        // Limpiamos el nombre quitando espacios y caracteres raros
        const cleanName = req.file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
        const fileName = `${Date.now()}_${cleanName}`;

        // Subimos a Supabase Storage
        const { error } = await supabase.storage
            .from('images')
            .upload(`typologies/${fileName}`, req.file.buffer, {
                contentType: req.file.mimetype
            });

        if (error) throw error;

        // Obtenemos la URL pública
        const { data } = supabase.storage
            .from('images')
            .getPublicUrl(`typologies/${fileName}`);

        // Devolvemos la URL pública
        res.json({ success: true, filePath: data.publicUrl });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error al pujar la imatge." });
    }
});

// Ruta para manejar el envío del formulario
router.post("/", async (req, res) => {
    // Obtenemos los datos del formulario
    const { name, image } = req.body;

    // Validamos que el nombre no esté vacío
    if (!name) {
        return res.status(400).json({ success: false, message: "El nom és obligatori" });
    }

    try {
        // Guardamos la tipología
        await TypologyModel.create({ name, image });
        return res.json({ success: true, message: "Tipologia guardada correctament!" });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Error intern del servidor" });
    }
});

// Exportamos el router para usarlo en index.js
export default router;