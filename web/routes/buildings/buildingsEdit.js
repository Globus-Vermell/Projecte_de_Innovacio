import express from "express";
import multer from "multer";
import { BuildingModel } from "../../models/BuildingModel.js";

// Configuración de multer para subir imágenes
const upload = multer({ storage: multer.memoryStorage() });

// Constante y configuración del servidor Express
const router = express.Router();

// Ruta para obtener un edificio por ID para editar
router.get("/:id", async (req, res) => {
    // Recogemos el ID de la construcción
    const id = Number(req.params.id);

    try {
        // Buscamos el edificio por ID
        const building = await BuildingModel.getById(id);

        // Si no se encuentra el edificio, devolvemos un error
        if (!building) {
            return res.status(404).send("Edificació no trobada");
        }

        // Buscamos datos relacionados
        const related = await BuildingModel.getRelatedData(id);

        // Renderizamos la vista de edificació con los datos actuales
        res.render("buildings/buildingsEdit", {
            building,
            currentPublications: related.publications,
            currentArchitects: related.architects,
            imagenes: related.images
        });

    } catch (err) {
        console.error("Error cargando edificio:", err);
        return res.status(500).send("Error del servidor");
    }
});

// Ruta para obtener tipologías filtradas por publicaciones
router.get("/typologies/filter", async (req, res) => {
    // Recogemos los IDs de las publicaciones
    const idsParam = req.query.ids;
    if (!idsParam) return res.json([]);

    try {
        // Convertimos el texto "1,2,3" a un array de números [1, 2, 3]
        const pubIds = idsParam.split(',').map(id => parseInt(id));

        // Buscamos las tipologías filtradas
        const typologies = await BuildingModel.getTypologiesByPublicationIds(pubIds);

        // Devolvemos las tipologías
        res.json(typologies);
    } catch (error) {
        console.error("Error filtrando tipologías:", error);
        return res.status(500).json([]);
    }
});

// Ruta para manejar la subida de imágenes
router.post("/upload", upload.array('pictures', 10), async (req, res) => {
    // Recogemos los archivos
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false, message: "No s'ha pujat cap fitxer." });
    }

    try {
        // Subimos las imágenes
        const filePaths = await BuildingModel.uploadImages(req.files);

        // Devolvemos las rutas de las imágenes
        res.json({ success: true, filePaths });
    } catch (err) {
        console.error("Error subiendo a Supabase:", err);
        res.status(500).json({ success: false, message: "Error al pujar fitxers al núvol." });
    }
});

// Ruta para actualizar un edificio
router.put("/:id", async (req, res) => {
    // Recogemos el ID de la construcción
    const id = Number(req.params.id);

    // Recogemos los datos del formulario
    const {
        name, address, coordinates, construction_year, description,
        surface_area, tipologia, id_protection,
        architects, publications, pictureUrls
    } = req.body;

    try {
        // Preparamos los datos para la actualización
        const buildingData = {
            name,
            location: address,
            coordinates,
            construction_year: parseInt(construction_year),
            description,
            surface_area: parseInt(surface_area),
            id_typology: parseInt(tipologia),
            id_protection: parseInt(id_protection)
        };

        // Preparamos las relaciones
        const relations = {
            architects: architects ? (Array.isArray(architects) ? architects : [architects]) : [],
            publications: publications ? (Array.isArray(publications) ? publications : [publications]) : [],
            pictureUrls: pictureUrls || []
        };

        // Actualizamos el edificio
        await BuildingModel.update(id, buildingData, relations);

        res.json({ success: true, message: "Edificació actualitzada correctament!" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error intern del servidor" });
    }
});

// Exportar el router para usarlo en index.js
export default router;