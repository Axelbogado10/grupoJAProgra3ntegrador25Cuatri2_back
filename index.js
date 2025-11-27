/*======================
    Importaciones
======================*/
import express from "express";
const app = express();
import environments from "./src/api/config/environments.js";
const PORT = environments.port;
const session_key = environments.session_key;
import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js"; 
import { productRoutes, userRoutes, viewRoutes } from "./src/api/routes/index.js";
import { __dirname, join } from "./src/api/utils/index.js";
import session from "express-session";
import connection from "./src/api/database/db.js";
import bcrypt from "bcrypt";

/*===================
    Middlewares
====================*/
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerUrl);
app.use(express.static(join(__dirname, "src/public")));
app.use("/uploads", express.static(join(__dirname, "src/uploads")));

/*================
    Config
================*/
app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views"));

/*================
    LogIn
================*/
app.use(session({
    secret: session_key, // Esto firma las cookies para evitar manipulacion
    resave: false,       // Esto evita guardar la sesion si no hubo cambios
    saveUninitialized: true // No guarde sesiones vacias
}));

/*======================
    Rutas
======================*/
app.use("/api/products", productRoutes);
app.use("/", viewRoutes);
app.use("/api/users", userRoutes);
/*======================
    LogIn POST
======================*/
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body || {};
        // Validación básica
        if (!email || !password) {
            return res.render("login", {
                title: "Login",
                error: "Todos los campos son necesarios!"
            });
        }
        let user = null;
        // 1) Intentamos buscar en la base, pero sin romper si falla
        try {
            const sql = "SELECT * FROM users WHERE email = ?";
            const result = await connection.query(sql, [email]);
            // Soportamos tanto [rows] como rows directos
            const rows = Array.isArray(result) ? result[0] : result;
            if (Array.isArray(rows) && rows.length > 0) {
                user = rows[0];
            }
        } catch (dbError) {
            console.error("Error consultando tabla users (se continúa con usuario de prueba): ", dbError);
        }
        // 2) Si encontramos usuario en DB, intentamos comparar contraseña
        if (user) {
            let match = false;
            try {
                // Si el password es hash bcrypt válido, comparamos con bcrypt
                if (typeof user.password === "string" && /^\$2[aby]\$\d{2}\$/.test(user.password)) {
                    match = await bcrypt.compare(password, user.password);
                } else {
                    // Si NO parece hash bcrypt, comparamos texto plano
                    match = (password === user.password);
                }
            } catch (bcryptError) {
                console.error("Error en bcrypt.compare (se intenta comparacion directa): ", bcryptError);
                match = (password === user.password);
            }
            if (!match) {
                return res.render("login", {
                    title: "Login",
                    error: "Error! Email o password no válidos"
                });
            }
            // Login OK con usuario de la base
            req.session.user = {
                id: user.id,
                name: user.name,
                email: user.email
            };
            return res.redirect("/");
        }
        // 3) Fallback: usuario de prueba fijo (sin tocar SQL)
        if (email === "test@test.com" && password === "test") {
            req.session.user = {
                id: 1,
                name: "Usuario de prueba",
                email
            };
            return res.redirect("/");
        }
        // Si no matcheó ni DB ni usuario fijo
        return res.render("login", {
            title: "Login",
            error: "Error! Email o password no válidos"
        });
    } catch (error) {
        console.error("Error en el login GENERAL: ", error);
        return res.render("login", {
            title: "Login",
            error: "Error interno del servidor en Login."
        });
    }
});

/*======================
    LogOut
======================*/
app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log("Error al destruir la sesion: ", err);
            return res.status(500).json({
                error: "Error al cerrar la sesion"
            });
        }
        res.redirect("/login");
    });
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});