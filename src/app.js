import express from "express";
import ProductManager from "./ProductManager.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

const manager = new ProductManager("./src/Products.json");
const app = express();

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


app.get("/products", async (req, res) => {
    const products = await manager.getProducts();
    const {limit} = req.query;
    if (limit) {
        return res.send(products.filter((u) => u.id < limit));
    } else {
        res.send(products);
    }
});

app.get("/products/:pid", async (req, res) => {
    const products = await manager.getProducts();
    const {pid} = req.params;
    const product = products.find((u) => u.id === parseInt(pid));  // converti a Numero porque lo lee por defecto como string 
    // Si no encontramos el Producto respondemos con un not found
    if (!product) {
        return res
        .status(404)
        .send({error: `No existe el Producto con Codigo ${pid}`});
    } else {
        res.send(product);
    }
    
});

app.listen(8080, () => {
    console.log("Server listening on port 8080 !!!");
});



