import express from "express";
import supabase from "../../config.js";


// Constante y configuración del srvidor Express
const router = express.Router();

// Ruta para obtener todas las nomenclaturas
router.get("/", async (req, res) => {
    const { data: nomenclaturas, error } = await supabase
        .from("nomenclature")
        .select("*");

    if (error) {
        console.error("Error al obtener nomenclaturas:", error);
        return res.status(500).send("Error al obtener nomenclaturas");
    }

    res.render("nomenclature/nomenclature", { nomenclaturas });
});

// Ruta para eliminar una nomenclatura
router.delete("/delete/:id", async (req, res) => {
    const id = Number(req.params.id);

    const { error } = await supabase
        .from("nomenclature")
        .delete()
        .eq("id_nomenclature", id);

    if (error) {
        console.error("Error borrando:", error);
        return res.status(500).json({ success: false, message: "Error al borrar." });
    }

    return res.json({ success: true, message: "Nomenclatura eliminada correctament!" });
});

// Exportar el router para usarlo en index.js
export default router;