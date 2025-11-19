import express from "express";
import supabase from "../../config.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const { data: users, error } = await supabase
        .from("users")
        .select("*");

    if (error) {
        console.error("Error al obtener usuarios:", error);
        return res.status(500).send("Error al obtener usuarios");
    }

    res.render("users/users", { users });
});

router.delete("/delete/:id", async (req, res) => {
    const id = Number(req.params.id);

    const { error } = await supabase
        .from("users")
        .delete()
        .eq("id_user", id);

    if (error) {
        console.error("Error borrando usuario:", error);
        return res.status(500).json({ success: false, message: "Error al borrar l'usuari." });
    }

    return res.json({ success: true, message: "Usuari eliminat correctament!" });
});

export default router;