import express from "express";
import supabase from "../../config.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.render("users/usersForm");
});

router.post("/", async (req, res) => {
    const { name, email, password, confirmPassword, level } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Nom, email i contrasenya són obligatoris"
        });
    }

    // validación de confirmación de contraseña
    if (password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Les contrasenyes no coincideixen"
        });
    }

    try {
        const { error } = await supabase
            .from("users")
            .insert([
                {
                    name,
                    email,
                    password,
                    level
                }
            ]);

        if (error) {
            console.error("Error al guardar usuari:", error);
            return res.status(400).json({ success: false, message: "Error al guardar l'usuari" });
        }

        return res.json({ success: true, message: "Usuari creat correctament!" });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, message: "Error intern del servidor" });
    }
});

export default router;
