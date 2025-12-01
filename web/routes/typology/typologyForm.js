import express from "express";
import multer from "multer";
import { TypologyModel } from "../../models/TypologyModel.js";

// Configuración de multer
const upload = multer({ dest: 'public/images/buildings' });

// Constante y configuración del servidor Express
const router = express.Router();

// Ruta para mostrar el formulario de nueva tipología
router.get("/", (req, res) => {
    res.render("typology/typologyForm");
});

// Ruta auxiliar para subir la imagen al crear
router.post("/upload", upload.single('image'), (req, res) => {
    // Validamos que se haya subido un archivo
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No s'ha pujat cap fitxer." });
    }
    // Obtenemos la ruta de la imagen
    const filePath = `/images/buildings/${req.file.filename}`;
    res.json({ success: true, filePath });
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