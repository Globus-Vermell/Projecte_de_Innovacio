import express from 'express';
import multer from "multer";
import { TypologyModel } from '../../models/TypologyModel.js';

// Configuración de multer para guardar en la carpeta de tipologías(De momento en buildings)
const upload = multer({ dest: 'public/images/buildings' });

// Constante y configuración del servidor Express
const router = express.Router();

// Ruta para obtener una tipología por ID para editar
router.get('/:id', async (req, res) => {
    // Obtenemos el ID de la tipología
    const id = Number(req.params.id);
    try {
        // Obtenemos la tipología
        const typology = await TypologyModel.getById(id);
        res.render('typology/typologyEdit', { typology });
    } catch (error) {
        return res.status(404).send('Tipologia no trobada');
    }
});

// Ruta para subir la imagen de la tipología al servidor
router.post("/upload", upload.single('image'), (req, res) => {
    // Validamos que se haya subido un archivo
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No s'ha pujat cap fitxer." });
    }
    // Obtenemos la ruta de la imagen
    const filePath = `/images/buildings/${req.file.filename}`;
    res.json({ success: true, filePath });
});

// Ruta para actualizar una tipología
router.put('/:id', async (req, res) => {
    // Obtenemos el ID de la tipología
    const id = Number(req.params.id);
    // Obtenemos los datos de la tipología
    const { name, image } = req.body;

    try {
        // Actualizamos la tipología
        await TypologyModel.update(id, { name, image });
        res.json({ success: true, message: 'Tipologia actualitzada correctament!' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error intern del servidor' });
    }
});

// Exportamos el router para usarlo en index.js
export default router;