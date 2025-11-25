import express from 'express';
import supabase from '../../config.js';


// Constante y configuración del srvidor Express
const router = express.Router();

// Ruta para obtener una publicación por ID para editar
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);

    const { data: publication, error } = await supabase
        .from('publications')
        .select('*')
        .eq('id_publication', id)
        .single();

    if (error || !publication) {
        console.error('Error fetching publication:', error);
        return res.status(404).send('Publicació no trobada');
    }

    res.render('publications/publicationsEdit', { publication });
});

// Ruta para actualizar una publicación
router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { title, description, themes, acknowledgment, publication_edition } = req.body;

    try {
        // Actualizar la publicación en la base de datos
        const { error } = await supabase
            .from('publications')
            .update({ title, description, themes, acknowledgment, publication_edition })
            .eq('id_publication', id);

        if (error) {
            console.error('Error updating publication:', error);
            return res.status(400).json({ success: false, message: 'Error al actualizar la publicació' });
        }

        res.json({ success: true, message: 'Publicació actualitzada correctament!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error intern del servidor' });
    }
});

// Exportar el router para usarlo en index.js
export default router;