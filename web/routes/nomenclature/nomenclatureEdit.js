import express from 'express';
import supabase from '../../config.js';


// Constante y configuración del srvidor Express
const router = express.Router();

// Ruta para obtener una nomenclatura por ID para editar
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);

    const { data: nomenclature, error } = await supabase
        .from('nomenclature')
        .select('*')
        .eq('id_nomenclature', id)
        .single();

    if (error || !nomenclature) {
        console.error('Error fetching nomenclature:', error);
        return res.status(404).send('Nomenclatura no trobada');
    }

    res.render('nomenclature/nomenclatureEdit', { nomenclature });
});

// Ruta para actualizar una nomenclatura
router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { name, description } = req.body;

    try {
        // Actualizar la nomenclatura en la base de datos
        const { error } = await supabase
            .from('nomenclature')
            .update({ name, description })
            .eq('id_nomenclature', id);

        if (error) {
            console.error('Error updating nomenclature:', error);
            return res.status(400).json({ success: false, message: 'Error al actualizar nomenclatura' });
        }

        res.json({ success: true, message: 'Nomenclatura actualitzada correctament!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error intern del servidor' });
    }
});

// Exportar el router para usarlo en index.js
export default router;
