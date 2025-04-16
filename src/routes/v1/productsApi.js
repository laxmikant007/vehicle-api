import express from "express";

import ProductController from "../../controllers/ProductController.js";

const productRouter = express.Router();

productRouter.post("/add", ProductController.createProduct);
productRouter.put("/:id", ProductController.updateProduct);
productRouter.delete("/:id", ProductController.deleteProduct);
productRouter.get("/all", ProductController.getAllProducts);
productRouter.get("/:id", ProductController.getProduct);

productRouter.get("/seed", ProductController.seedProducts);

export default productRouter;

