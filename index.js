/*Importaciones */
import express from "express"; // Importamos el framework Express
const app = express(); import cors from "cors";
import environments from "./src/api/config/environments.js"; // Importamos las variables de entorno
import connection from "./src/api/database/db.js"; // Importamos la conexion a la BBDD
const PORT = environments.port;

/*===================
    Middlewares
===================*/
app.use(cors());
// TO DO, probar a comentar esto cuando hagamos el endpoint POST
app.use(express.json());


////////////////////////////////////////////////////////////////////////////////////////
/*app.get("/products", async (req, res) => {
    try {
        const sql = `SELECT * FROM products`;
        const [rows] = await connection.query(sql);
        console.log(rows);
        
        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados"
        });



    } catch(error) {
        console.error(error);

        res.status(500).json({
            message: "Error interno al obtener productos"
        })
    }
});*/
// Get product by id -> Consultar producto por su id
app.get("/products/:id", async (req, res) => {
    try {

        let { id } = req.params; // Esto nos permite obtener el valor numerico despues de products /products/2

        let sql = `SELECT * FROM products where id = ?`;
        const [rows] = await connection.query(sql, [id]); // El id reemplaza nuestro ?

        res.status(200).json({
            payload: rows
        });


    } catch (error) {
        console.error("Error obteniendo producto con id", error.message);

        res.status(500).json({
            error: "Error interno al obtener un producot con id"
        })
    }
});
////////////////////////////////////////////////////////////////////////////////////////

////////////
//ENDPOINT//
////////////
app.get("/dashboard", (req, res) => {
    //Devolvemos una respuesta den texto plano desde la url "/dashboard" 
    //Posteriormente desde esta url devolvemos una pagina HTML de la carpeta
    res.send("Hola desde la raiz del TP");
});

app.get("/products", async (req, res) => {
    try {
        const sql = `SELECT * FROM products`;
        /*
        const resultado = await connection.query(sql);
        console.log(resultado)
        */

        const [rows] = await connection.query(sql);
        console.log(rows);
        
        res.status(200).json({
            payload: rows,
            message: rows.length === 0? "no se encontraron productos" : "productos encontrados"
        })

    } catch(error) {
        console.log(error);

        res.status(500).json({
            message:"Error"
        })
    }
});

///Creación de producto
app.post("/products", async (req, res)=>{
    try {
        
    } catch (error) {
        console.log("Error interno del servidor");
        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
});



app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`)
})