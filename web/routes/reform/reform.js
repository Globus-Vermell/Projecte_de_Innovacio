import express from "express";
import supabase from "../../config.js";


// Constante y configuración del srvidor Express
const router = express.Router();

// Ruta para obtener todas las reformas
router.get("/", async (req, res) => {
	const { data: reformas, error } = await supabase
		.from("reform")
		.select("*, architects(name)")
		.order("year", { ascending: false });

	if (error) {
		console.error("Error al obtener reformas:", error);
		return res.status(500).send("Error al obtener reformas");
	}

	res.render("reform/reform", { reformas });
});

// Ruta para eliminar una reforma
router.delete("/delete/:id", async (req, res) => {
	const id = Number(req.params.id);

	const { error } = await supabase
		.from("reform")
		.delete()
		.eq("id_reform", id);

	if (error) {
		console.error("Error borrando:", error);
		return res.status(500).json({ success: false, message: "Error al borrar." });
	}

	return res.json({ success: true, message: "Reforma eliminada correctament!" });
});

// Exportar el router para usarlo en index.js
export default router;