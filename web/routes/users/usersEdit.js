import express from "express";
import supabase from "../../config.js";

// Constante y configuración del srvidor Express
const router = express.Router();

// Ruta para obtener un usuario por ID para editar
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

// Ruta para actualizar un usuario
router.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { name, email, password, level } = req.body;

    try {
        // Actualizar el usuario en la base de datos
        const { error } = await supabase
            .from("users")
            .update({
                name,
                email,
                password,
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

// Exportar el router para usarlo en index.js
export default router;