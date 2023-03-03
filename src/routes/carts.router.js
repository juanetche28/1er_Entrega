import { Router, json } from "express";

let carts = [];

const cartsRouter = Router();
cartsRouter.use(json());

cartsRouter.get("/", (req, res) => {
  res.send(carts);
});

cartsRouter.post("/", (req, res) => {
  const { username, email } = req.body;

  const newCart = { username, email };

  users = [...carts, newCart];

  res.send(newCart);
});

export default cartsRouter;
