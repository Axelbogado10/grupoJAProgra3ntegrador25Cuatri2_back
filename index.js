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

    } catch(error) {
        console.log(error);
    }
});

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`)
})