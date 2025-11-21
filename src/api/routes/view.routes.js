import { Router } from "express";
import { productsView } from "../controller/view.controllers.js";
const router = Router();


router.get("/", productsView);

router.get("/consultar", (req,res) => {
    res.render("consultar", {
        tittle:"consutlar",
        about:"consultar producto por id"
})
});

router.get("/crear", (req,res) => {
    res.render("crear", {
        tittle:"crear",
        about:"Crear producto"
})
});

router.get("/modificar", (req,res) => {
    res.render("modificar", {
        tittle:"modificar",
        about:"modificar producto"
})
});

router.get("/eliminar", (req,res) => {
    res.render("eliminar", {
        tittle:"eliminar",
        about:"eliminar producto"
})
});

export default router;