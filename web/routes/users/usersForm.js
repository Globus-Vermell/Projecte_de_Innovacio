import express from "express";
import supabase from "../../config.js";

// Constante y configuración del srvidor Express
const router = express.Router();

// Ruta para mostrar el formulario de nuevo usuario
router.get("/", (req, res) => {
    res.render("users/usersForm");
});

// Ruta para manejar el envío del formulario de nuevo usuario
router.post("/", async (req, res) => {
    const { name, email, password, confirmPassword, level } = req.body;

    // Validar que los campos obligatorios no estén vacíos
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
        // Insertar el nuevo usuario en la base de datos
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

// Exportar el router para usarlo en index.js
export default router;
