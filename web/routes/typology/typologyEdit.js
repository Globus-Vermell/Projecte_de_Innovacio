import express from 'express';
import multer from "multer";
import supabase from '../../config.js';
import { TypologyModel } from '../../models/TypologyModel.js';

// Configuración de multer 
const upload = multer({ storage: multer.memoryStorage() });
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