import productModels from "../models/product.models.js";

export const productsView = async (req, res) => {
    try {
        const [rows] = await productModels.selectALLProducts();

        res.render("index", {
        title: "Listado productos",
        activeRoute: "inicio",
        productos: rows
        });

    } catch (error) {
        console.log(error);
    }
};
