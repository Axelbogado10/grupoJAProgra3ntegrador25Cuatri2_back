import { Router } from "express";
const router = Router();

import connection from "../database/db.js";
import { validateId } from "../middlewares/middlewares.js";


router.get("/", async (req, res) => {
    try {
        
     
        const sql = `SELECT * FROM productos`;
        const [rows] = await connection.query(sql);
        
        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados"
        });


    } catch(error) {
        console.error(error);

        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
});


router.get("/:id", validateId, async (req, res) => {
    try {

        // el :id se extrae con el objeto request -> req.params.id
        let { id } = req.params; // Esto nos permite obtener el valor numerico despues de products /products/2


        if(!id || isNaN(Number(id))) {
            return res.status(400).json({
                message: "El id del producto debe ser un numero valido"
            });
        }
        
        /* Si enviara este valor con post, lo recogeria asi:
        let { id } = req.body;
        */

        // Los ? representan los placeholders, se usan por temas de seguridad para prevenir inyecciones SQL
        let sql = `SELECT * FROM productos where id = ?`;
        const [rows] = await connection.query(sql, [id]); // El id reemplaza nuestro ?


        // Hacemos la consulta, y tenemos el resultado en la variable rows
        // Optimizacion 2: Comprobamos que existe el producto con ese id
        if(rows.length === 0) {
            console.log("Error, no existe producto con ese id");

            return res.status(404).json({
                message: `No se encontro producto con id ${id}`
            });
        }

        res.status(200).json({
            payload: rows
        });


    } catch (error) {
        console.error("Error obteniendo producto con id", error.message);

        res.status(500).json({
            error: "Error interno al obtener un producto con id"
        })
    }
});





router.post("/", async (req, res) => {
    try {
        const { name, image, category, price } = req.body;
        // Aca imprimimos lo que enviamos desde el form que previamente se parseo gracias al middleware -> express.json()
        console.log(req.body); 

        //Opitmizacion 1:Validar datos de entrada
        if(!name || !image ||  !category || !price) {
            // return hace que el endopoint termine aca y el usuario solo reciba esta respuesta
            return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar todos los campos del formulario"
            })
        }

        // Los placeholders ?, evitan inyecciones SQL para evitar ataques de este tipo
        let sql = "INSERT INTO productos (name, image, category, price) VALUES (?, ?, ?, ?)";

        // Le enviamos estos valores a la BBDD
        let [rows] = await connection.query(sql, [name, image, category, price]);

        // Devolvemos una respuesta 201 "Created"
        res.status(201).json({
            message: "Producto creado con exito"
        });


    } catch (error) {
        console.error("Error interno del servidor");

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
});


///////////////////
// UPDATE -> PUT
// Actualizar un producto
router.put("/", async (req, res) => {
    try {
        /*
        "id": 4,
        "name": "hamburguesa pollo a la parrilla",
        "image": "https://burgernj.com/wp-content/uploads/2021/05/Grilled-Chicken-Burger_.jpg",
        "category": "food",
        "price": "1500.00",
        "active": 1
      */
        let { id, name, image, category, price, active } = req.body;

        if(!name || !image ||  !category || !price) {
            // return hace que el endopoint termine aca y el usuario solo reciba esta respuesta
            return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar todos los campos del formulario"
            });
        }

        let sql = `
            UPDATE productos
            SET name = ?, image = ?, price = ?, category = ?
            WHERE id = ?
        `;

        let [result] = await connection.query(sql, [name, image, price, category, id]);
        console.log(result);

        if(result.affectedRows === 0) {
            return res.status(400).json({
                message: "no se actualizo el producto"
            });
        }

        res.status(200).json({
            message: "Producto actualizado correctamente"
        });
        

    } catch (error) {
        console.error("Error al actualizar el producto: ", error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
});



////////////////
// DELETE -> DELETE
// Eliminar producto
router.delete("/:id", validateId, async (req, res) => {
    try {
        let { id } = req.params;

        // Opcion 1: Borrado normal
        let sql = `DELETE FROM productos WHERE id = ?`;

        // Opcion 2: Baja logica
        // let sql2 = "UPDATE products set active = 0 WHERE id = ?";

        let [result] = await connection.query(sql, [id]);
        console.log(result);
        // affectedRows: 1 -> Nos indica que hubo una fila que fue afectada


        if(result.affectedRows === 0) {
            return res.status(404).json({
                message: `producto`
            });
        }


        return res.status(200).json({
            message: `Producto con id ${id} eliminado correctamente`
        });


    } catch (error) {
        console.log(`Error al eliminar un producto con id ${id}: `, error);

        res.status(500).json({
            message: `Error al eliminar un producto con id ${id}`,
            error: error.message
        })
    }
});


export default router;