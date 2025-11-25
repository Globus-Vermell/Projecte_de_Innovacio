import express from 'express';
import supabase from '../../config.js';


// Constante y configuración del srvidor Express
const router = express.Router();

// Ruta para obtener una protección por ID para editar
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);

    const { data: protection, error } = await supabase
        .from('protection')
        .select('*')
        .eq('id_protection', id)
        .single();

    if (error || !protection) {
        console.error('Error fetching protection:', error);
        return res.status(404).send('Protecció no trobada');
    }

    res.render('protection/protectionEdit', { protection });
});

// Ruta para actualizar una protección
router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { level, description } = req.body;

    try {
        // Actualizar la protección en la base de datos
        const { error } = await supabase
            .from('protection')
            .update({ level, description })
            .eq('id_protection', id);

        if (error) {
            console.error('Error updating protection:', error);
            return res.status(400).json({ success: false, message: 'Error al actualizar la protecció' });
        }

        res.json({ success: true, message: 'Protecció actualitzada correctament!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error intern del servidor' });
    }
});


// Exportar el router para usarlo en index.js
export default router;