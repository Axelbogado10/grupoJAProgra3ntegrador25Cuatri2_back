/* Middleware de aplicacion -> Se aplica a todas las peticiones y respuestas
Middleware (de aplicacion) logger -> Vamos a registrar por consola cada peticion que se produjo*/
const loggerUrl = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}]  ${req.method}  ${req.url}`);
    next(); 
}
const validateId = (req, res, next) => {
    const { id } = req.params;
    if(!id || isNaN(Number(id))) {
        return res.status(400).json({
            message: "El id del producto debe ser un numero valido"
        })
    };
    req.id = parseInt(id, 10);
    console.log("Id validado: ", req.id);
    next();
}

const requireLogin = (req, res, next) => {   
    if(!req.session.user) {
        return res.redirect("/login");
    }
    next();
}
export {
    loggerUrl,
    validateId,
    requireLogin
}