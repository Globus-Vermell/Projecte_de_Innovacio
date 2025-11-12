import express from "express";
import supabase from "../config.js";

const router = express.Router();

// 🧱 Listado de arquitectos
router.get("/", async (req, res) => {
  const { data: architects, error } = await supabase
    .from("architects")
    .select("*");

  if (error) {
    console.error("Error al obtener arquitectos:", error);
    return res.status(500).send("Error al obtener arquitectos");
  }

  res.render("arquitectos", { architects });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { data: architect, error } = await supabase
    .from("architects")
    .select("*")
    .eq("id_architect", id)
    .single();

  if (error || !architect) {
    console.error("Error al obtener el arquitecto:", error);
    return res.status(404).send("Arquitecto no encontrado");
  }

  res.render("arquitectoDetall", { architect });
});

export default router;