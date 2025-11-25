import express from 'express';
import supabase from '../../config.js';


// Constante y configuración del srvidor Express
const router = express.Router();

// Ruta para obtener una reforma por ID para editar
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);

    const { data: reform, error } = await supabase
        .from('reform')
        .select('*')
        .eq('id_reform', id)
        .single();

    if (error || !reform) {
        console.error('Error fetching reform:', error);
        return res.status(404).send('Reforma no trobada');
    }


    // Ruta para obtener los arquitectos para el formulario de ediciónº
    const { data: architects, error: archError } = await supabase
        .from('architects')
        .select('*');

    if (archError) {
        console.error('Error fetching architects:', archError);
        return res.status(500).send('Error al obtenir arquitectes');
    }

    res.render('reform/reformEdit', { reform, architects });
});

// Ruta para actualizar una reforma
router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { year, id_architect } = req.body;

    try {
        // Actualizar la reforma en la base de datos
        const { error } = await supabase
            .from('reform')
            .update({
                year: parseInt(year),
                id_architect: parseInt(id_architect)
            })
            .eq('id_reform', id);

        if (error) {
            console.error('Error updating reform:', error);
            return res.status(400).json({ success: false, message: 'Error al actualizar la reforma' });
        }

        res.json({ success: true, message: 'Reforma actualitzada correctament!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error intern del servidor' });
    }
});

// Exportar el router para usarlo en index.js
export default router;
