import connection from "../database/db.js";


const selectALLProducts = () => {
    const sql = `SELECT * FROM productos`;
    return connection.query(sql);
}

const selectProductWhrereId = (id) => {
     let sql = `SELECT * FROM productos where id = ?`;
     return connection.query(sql, [id]);
}

const insertProduct = (nombre, imagen, categoria, precio) => {
     let sql = "INSERT INTO productos (nombre, imagen, categoria, precio) VALUES (?, ?, ?, ?)";
    return connection.query(sql, [nombre, imagen, categoria, precio]);
}

const updateProduct = (nombre, imagen, precio, categoria, id) => {
    let sql = `
            UPDATE productos
            SET nombre = ?, imagen = ?, precio = ?, categoria = ?
            WHERE id = ?
        `;

        return connection.query(sql, [nombre, imagen, categoria, precio, id]);
}

const deleteProduct = (id) => {
    let sql = `DELETE FROM productos WHERE id = ?`;

        // Opcion 2: Baja logica
        // let sql2 = "UPDATE products set active = 0 WHERE id = ?";

        return connection.query(sql, [id]);
}

export default{
    selectALLProducts,
    selectProductWhrereId,
    insertProduct,
    updateProduct,
    deleteProduct
}