import { Router, json } from "express";

let products = [];

const productsRouter = Router();
productsRouter.use(json());

productsRouter.get("/", (req, res) => {
  res.send(products);
});

productsRouter.post("/", (req, res) => {
  const { username, email } = req.body;

  const newProduct = { username, email };

  users = [...products, newProduct];

  res.send(newProduct);
});

export default productsRouter;
