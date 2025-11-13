import { Router } from "express";
const router = Router();

import { validateId } from "../middlewares/middlewares.js";
import { createProduct, getALLProducts, getProductById, modifyProduct, removeProduct } from "../controller/product.controllers.js";


router.get("/", getALLProducts);


router.get("/:id", validateId, getProductById);




router.post("/", createProduct);


///////////////////
// UPDATE -> PUT
// Actualizar un producto
router.put("/", modifyProduct);


////////////////
// DELETE -> DELETE
// Eliminar producto
router.delete("/:id", validateId, removeProduct);


export default router;