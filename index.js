/*======================
    Importaciones
======================*/
import express from "express"; 
const app = express(); 

import environments from "./src/api/config/environments.js"; 
const PORT = environments.port;
const session_key = environments.session_key;

import cors from "cors"; 
import { loggerUrl, validateId } from "./src/api/middlewares/middlewares.js";
import { productRoutes, viewRoutes } from "./src/api/routes/index.js";

import { __dirname, join } from "./src/api/utils/index.js";

import session from "express-session";

/*======================
    Middleware
======================*/
app.use(cors()); // Middleware CORS basico que permite todas las solicitudes
app.use(express.json()); // Middleware para parsear JSON en el body
// Logger -> Vamos a registrar por consola cada peticion que se produjo
app.use(loggerUrl);

app.use(express.static(join(__dirname, "src/public"))) //Middleware para servir archivos estaticos
app.use("/uploads", express.static(join(__dirname, "src/uploads")));


/*======================
    Config
======================*/
app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views"));

/*Middleware de sesión
app.use(session({
    secret: session_key,// Esto firma las cookies para evitar manipulacion
    resave: false, // Esto evita guardar la sesion si no hubo cambios
    saveUninitialized: true// No guarde sesiones vacias
}));
*/

/*======================
    Rutas
======================*/
app.use("/api/products", productRoutes)

app.use("/", viewRoutes);

//app.use("/uploads", express.static("./src/uploads"));
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});