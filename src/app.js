import express from "express";
import ProductManager from "./ProductManager.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

const manager = new ProductManager("./src/Products.json");
const app = express();

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(8080, () => {
    console.log("Server listening on port 8080 !!!");
});



