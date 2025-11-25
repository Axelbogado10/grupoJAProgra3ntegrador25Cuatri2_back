import { Router } from "express";
import { productsView } from "../controller/view.controllers.js";
const router = Router();
router.get("/", productsView);

router.get("/consultar", (req, res) => {
    res.render("consultar", {
        title: "Consultar producto por id",
        activeRoute: "consultar"
    });
});

router.get("/crear", (req, res) => {
    res.render("crear", {
        title: "Crear producto",
        activeRoute: "crear"
    });
});

router.get("/modificar", (req, res) => {
    res.render("modificar", {
        title: "Actualizar producto",
        activeRoute: "modificar"
    });
});

router.get("/eliminar", (req, res) => {
    res.render("eliminar", {
        title: "Eliminar producto",
        activeRoute: "eliminar"
    });
});
export default router;