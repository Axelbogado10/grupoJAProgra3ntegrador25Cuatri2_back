import dotenv from "dotenv";

dotenv.config(); // cargamos las variables de entorno.env

// vamps a exportar esta informacion del .env
export default{
    port: process.env.PORT || 3500,
    session_key: process.env.SESSION_SECRET,
    database: {
        host: process.env.DB_HOST ,
        name: process.env.DB_NAME ,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
}