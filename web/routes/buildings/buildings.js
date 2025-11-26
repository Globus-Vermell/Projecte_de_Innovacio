import express from "express";
import supabase from "../../config.js";

// Constante y configuración del srvidor Express
const router = express.Router();

// Ruta para obtener todas las construcciones
router.get("/", async (req, res) => {
    const { data: buildings, error } = await supabase
        .from("buildings")
        .select("*")
        .order("name");

    if (error) {
        console.error("Error al obtener las construcciones:", error);
        return res.status(500).send("Error al obtener construcciones");
    }
    res.render("buildings/buildings", { buildings });
});

// Ruta para eliminar una construcción
router.delete("/delete/:id", async (req, res) => {
    const id = Number(req.params.id);

    const { error } = await supabase
        .from("buildings")
        .delete()
        .eq("id_building", id);

    if (error) {
        console.error("Error borrando:", error);
        return res.status(500).json({ success: false, message: "Error al borrar." });
    }

    return res.json({ success: true, message: "Edificació eliminada correctament!" });
});

// Exportar el router para usarlo en index.js
export default router;