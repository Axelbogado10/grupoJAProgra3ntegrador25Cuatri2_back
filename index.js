import express from "express"; //importamos el framework express
const app = express();
import environments from "./src/api/config/environments.js"; // importamos las variables de entonro
import connection from "./src/api/database/db.js";//importamos la conexion a la base de datos

const PORT = environments.port;

////////////
//ENDPOINT//
////////////
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

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`)
})