import express from "express";
import supabase from "../../config.js";


// Constante y configuración del srvidor Express
const router = express.Router();

// Ruta para obtener un arquitecto por ID para editar
router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);

    const { data: architect, error } = await supabase
        .from("architects")
        .select("*")
        .eq("id_architect", id)
        .single();

    if (error || !architect) {
        console.error("Error al obtener el arquitecte:", error);
        return res.status(404).send("Arquitecte no trobat");
    }

    res.render("architects/architectsEdit", { architect });
});

// Ruta para actualizar un arquitecto
router.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { name, description, birth_year, death_year, nationality } = req.body;


    try {
        const { error } = await supabase

        // Actualizar el arquitecto en la base de datos
            .from("architects")
            .update({ 
                name,
                description: description || null,
                birth_year : birth_year || null,
                death_year : death_year || null,
                nationality: nationality || null
            })
            .eq("id_architect", id);

        if (error) {
            console.error("Error al actualizar arquitecte:", error);
            return res.status(400).json({ success: false, message: "Error al actualizar" });
        }

        return res.json({ success: true, message: "Arquitecte actualitzat correctament!" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Error intern del servidor" });
    }
});

// Exportar el router para usarlo en index.js
export default router;