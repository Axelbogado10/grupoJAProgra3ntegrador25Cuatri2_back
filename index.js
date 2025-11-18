/*======================
    Importaciones
======================*/
import express from "express"; 
const app = express(); 

import connection from "./src/api/database/db.js"; 
import environments from "./src/api/config/environments.js"; 
const PORT = environments.port;

import cors from "cors"; 
import { loggerUrl, validateId } from "./src/api/middlewares/middlewares.js";
import { productRoutes } from "./src/api/routes/index.js";

import { __dirname, join } from "./src/api/utils/index.js";


app.use(cors()); // Middleware CORS basico que permite todas las solicitudes
app.use(express.json()); // Middleware para parsear JSON en el body
// Logger -> Vamos a registrar por consola cada peticion que se produjo
app.use(loggerUrl);

app.use(express.static(join(__dirname, "src/public"))) //Middleware para servir archivos estaticos
app.use("/uploads", express.static(join(__dirname, "src/uploads")));

app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views"));




/*======================
    Rutas
======================*/
app.use("/api/products", productRoutes)

app.get("/dashboard", async(req,res) => {
    try {
        const[rows] = await connection.query("SELECT * FROM productos");
        console.log(rows);
        
        res.render("index", {
            tittle: "Dashboard",
            about: "Listado de productos",
            productos: rows
        })
        } catch (error) {
            console.error(error);  
        }
});

//app.use("/uploads", express.static("./src/uploads"));
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});