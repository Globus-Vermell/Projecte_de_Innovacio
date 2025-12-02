import express from 'express';
import { PublicationModel } from '../../models/PublicationModel.js';
import { TypologyModel } from '../../models/TypologyModel.js';

// Constante y configuración del servidor Express
const router = express.Router();

// Ruta para obtener una publicación por ID para editar
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);

    try {
        // Obtenemos la publicación
        const publication = await PublicationModel.getById(id);
        if (!publication) {
            return res.status(404).send('Publicació no trobada');
        }

        // Obtenemos todas las tipologías
        const allTypologies = await TypologyModel.getAll();

        // Obtenemos las tipologías seleccionadas actualmente
        const currentTypologies = await PublicationModel.getTypologiesByPublication(id);

        res.render('publications/publicationsEdit', {
            publication,
            typologies: allTypologies || [],
            currentTypologies
        });

    } catch (err) {
        console.error('Error fetching data:', err);
        return res.status(500).send('Error intern del servidor');
    }
});

// Ruta para actualizar una publicación
router.put('/:id', async (req, res) => {
    // Obtenemos el id de la publicación
    const id = Number(req.params.id);
    // Obtenemos los datos del formulario
    const { title, description, themes, acknowledgment, publication_edition, selectedTypologies } = req.body;

    try {
        // Preparamos los datos de la publicación
        const pubData = {
            title,
            description,
            themes,
            acknowledgment,
            publication_edition
        };
        // Procesamos IDs de tipologías 
        const typeIds = selectedTypologies ? (Array.isArray(selectedTypologies) ? selectedTypologies : [selectedTypologies]) : [];

        // Actualizamos la publicación
        await PublicationModel.update(id, pubData, typeIds);

        res.json({ success: true, message: 'Publicació actualitzada correctament!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error intern del servidor' });
    }
});

// Exportar el router para usarlo en index.js
export default router;