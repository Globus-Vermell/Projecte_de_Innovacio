import express from "express";
import supabase from "../../config.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);

    const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("id_user", id)
        .single();

    if (error || !user) {
        console.error("Error obtenint usuari:", error);
        return res.status(404).send("Usuari no trobat");
    }

    res.render("users/usersEdit", { user });
});

router.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { name, email, level } = req.body;

    try {
        const { error } = await supabase
            .from("users")
            .update({
                name,
                email,
                level
            })
            .eq("id_user", id);

        if (error) {
            console.error("Error al actualizar usuari:", error);
            return res.status(400).json({ success: false, message: "Error al actualizar l'usuari" });
        }

        return res.json({ success: true, message: "Usuari actualitzat correctament!" });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, message: "Error intern del servidor" });
    }
});

export default router;