import express from "express";
import supabase from "../config.js";
const router = express.Router();


// Página principal — muestra los títulos en una lista
router.get("/", async (req, res) => {
 const {data:publications, error } = await supabase
    .from("publications")
    .select("*");

    if (error) {
      console.error("Error al obtener publicaciones:", error);
      return res.status(500).send("Error al obtener publicaciones");
    }
    res.render("publicaciones", { publications });
});

router.get("/:id", async (req, res) => {
  const {id} = req.params;
  const {data: publication, error } =await supabase
    .from("publications")
    .select("*")
    .eq("id_publication", id)
    .single();

    if (error || !publication){
      console.error("Error al obtener la publicación:", error);
      return res.status(404).send("Publicación no encontrada");
    }

    res.render("publicacionDetall", { publication });
});
export default router;