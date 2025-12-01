import express from 'express';
import { ProtectionModel } from '../../models/ProtectionModel.js';

// Constante y configuración del servidor Express
const router = express.Router();

// Ruta para obtener una protección por ID para editar
router.get('/:id', async (req, res) => {
    // Obtenemos el ID de la protección
    const id = Number(req.params.id);
    try {
        // Obtenemos la protección
        const protection = await ProtectionModel.getById(id);
        res.render('protection/protectionEdit', { protection });
    } catch (error) {
        return res.status(404).send('Protecció no trobada');
    }
});

// Ruta para actualizar una protección
router.put('/:id', async (req, res) => {
    // Obtenemos el ID de la protección
    const id = Number(req.params.id);
    // Obtenemos los datos de la protección
    const { level, description } = req.body;

    try {
        // Actualizamos la protección
        await ProtectionModel.update(id, { level, description });
        res.json({ success: true, message: 'Protecció actualitzada correctament!' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error intern del servidor' });
    }
});

// Exportar el router para usarlo en index.js
export default router;