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


/*===================
    Middlewares
=====================
- Los middlewares son basicamente funciones que se ejecutan entre la peticion req y la respuesta res

- La idea de los middlewares es no repetir instrucciones por cada endpoint

- Estos son middlewares de aplicacion -> se aplican a todas las peticiones
*/
app.use(cors()); // Middleware CORS basico que permite todas las solicitudes
app.use(express.json()); // Middleware para parsear JSON en el body
// Logger -> Vamos a registrar por consola cada peticion que se produjo
app.use(loggerUrl);

/*======================
    Rutas
======================*/
app.use("/api/products", productRoutes)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});