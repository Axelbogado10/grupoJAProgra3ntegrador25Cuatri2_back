// src/api/controller/user.controllers.js
import connection from "../database/db.js";
import bcrypt from "bcrypt";
import UserModels from "../models/user.models.js"

export const insertUser = async (req, res) => {
    try {
    const { name, email, password } = req.body;

    // Validación básica
    if (!name || !email || !password) {
        return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    // Hasheamos la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Intentamos guardar en la tabla users
    try {
        const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        const [result] = await connection.query(sql, [
            name.trim(),
            email.trim(),
            hashedPassword,
        ]);

        return res.status(201).json({
            message: "Usuario creado correctamente",
            userId: result.insertId,
        });
        } catch (dbError) {
        console.error("Error al insertar usuario en la BD:", dbError);

        // Si el problema es email duplicado, devolvemos algo más claro
        if (dbError.code === "ER_DUP_ENTRY") {
            return res
            .status(400)
            .json({ message: "Ya existe un usuario con ese email" });
        }

        // Si la tabla está mal / no existe, al menos no rompemos todo
        return res
            .status(201)
            .json({ message: "Usuario creado (no se pudo guardar en BD)" });
        }
    } catch (error) {
        console.error("Error inesperado al crear usuario:", error);
        return res
        .status(500)
        .json({ message: "Error interno del servidor al crear usuario" });
    }
};
