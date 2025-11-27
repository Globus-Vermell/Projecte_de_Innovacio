import express from 'express';
import supabase from '../../config.js';
import multer from "multer";

// Configuración de multer para guardar en la carpeta de tipologías
const upload = multer({ dest: 'public/images/buildings' });

const router = express.Router();

// Ruta para obtener una tipología por ID para editar
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);

    const { data: typology, error } = await supabase
        .from('typology')
        .select('*')
        .eq('id_typology', id)
        .single();

    if (error || !typology) {
        console.error('Error fetching typology:', error);
        return res.status(404).send('Tipologia no trobada');
    }

    res.render('typology/typologyEdit', { typology });
});

// Ruta para subir la imagen de la tipología al servidor
router.post("/upload", upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No s'ha pujat cap fitxer." });
    }
    // Retornar la ruta relativa per guardar-la a la BDD
    const filePath = `/images/buildings/${req.file.filename}`;
    res.json({ success: true, filePath });
});

// Ruta para actualizar una tipología
router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { name, image } = req.body;

    try {
        // Actualizar la tipología en la base de datos
        const { error } = await supabase
            .from('typology')
            .update({ name, image })
            .eq('id_typology', id);

        if (error) {
            console.error('Error updating typology:', error);
            return res.status(400).json({ success: false, message: 'Error al actualizar la tipologia' });
        }

        res.json({ success: true, message: 'Tipologia actualitzada correctament!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error intern del servidor' });
    }
});

export default router;