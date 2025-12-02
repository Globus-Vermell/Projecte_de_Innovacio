import express from "express";
import { PublicationModel } from "../../models/PublicationModel.js";
import { TypologyModel } from "../../models/TypologyModel.js";

// Constante y configuración del servidor Express
const router = express.Router();

// Ruta para mostrar el formulario de nueva publicación
router.get("/", async (req, res) => {
    try {
        // Obtenemos todas las tipologías para mostrarlas en el formulario
        const typologies = await TypologyModel.getAll();
        res.render("publications/publicationsForm", { typologies });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al cargar el formulario");
    }
});

// Ruta para manejar el envío del formulario de nueva publicación
router.post("/", async (req, res) => {
    // Obtenemos los datos del formulario
    const { title, description, themes, acknowledgment, publication_edition, selectedTypologies } = req.body;

    // Validamos que los campos obligatorios no estén vacíos
    if (!title || !themes || !publication_edition) {
        return res.status(400).json({
            success: false,
            message: "Els camps title, themes i publication_edition són obligatoris."
        });
    }

    try {
        // Preparamos los datos
        const pubData = {
            title,
            description: description || null,
            themes,
            acknowledgment: acknowledgment || null,
            publication_edition
        };

        // Procesamos IDs de tipologías
        const typeIds = selectedTypologies ? (Array.isArray(selectedTypologies) ? selectedTypologies : [selectedTypologies]) : [];

        // Creamos la publicación
        await PublicationModel.create(pubData, typeIds);

        return res.json({ success: true, message: "Publicació guardada correctament!" });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, message: "Error intern del servidor" });
    }
});

// Exportar el router para usarlo en index.js
export default router;