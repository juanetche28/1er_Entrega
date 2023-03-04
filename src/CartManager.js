import fs from "fs";

class CartManager {
    #path = "./Carts.json";
    constructor(path) {
        this.#path = path;
    }
    #nextId = 0;


    //Listar todos los carritos
    async getCarts() {
        try {
            const carts = await fs.promises.readFile(this.#path, "utf-8");
            return JSON.parse(carts);
        } catch (e) {
            return [];
        }
    }

    //Agregar nuevo Carrito
    async addCart(products) {
        const carts = await this.getCarts();
    
        if (!products)  {
            throw new Error("Missing parameters, check that there is no missing load products");
        }
        
        const newCart = {
            idCart: this.#nextId,
            products: products
        };

        const updateCarts = [...carts, newCart];
        await fs.promises.writeFile(this.#path, JSON.stringify(updateCarts));
        this.#nextId += 1;
    }

    // Obtener un Carrito por ID

    // async getCartById(cartId) {
    //     const carts = await this.getCarts();
    //     const result = (carts.find((p) => p.idCart === parseInt(cartId)));
    //     return new Promise ((resolve, reject) => {
    //         if (result == null) {
    //             reject("Cart id not found.");
    //         }
    //         resolve(result);
    //     });
    // }

    // Agregar un producto al carrito
    async addProduct(cid, pid) {
        const carts = await this.getCarts();
        const cartFind = (carts.find((p) => p.idCart === parseInt(cid)));
        const productFind = (cartFind.products.find((p) => p.product === parseInt(pid)))

        // Si no encuentra el ID del producto lo agrego con "quantity = 1"; si lo encuentra aumento quantity++ 
        if (!productFind) {

            const newProduct = {
                product: pid,
                quantity: 1
            };

            // Actualizo el "products" con el nuevo "product"
            const products = cartFind.products 
            const updateProduct = [...products, newProduct];

            // Actualizo el "cartFind" con el nuevo "product"
            cartFind.products = updateProduct;

            // Actualizo mi base de datos "Carts.json" con el carrito actualizado 
            const updateCarts = [...carts, cartFind];
            await fs.promises.writeFile(this.#path, JSON.stringify(updateCarts));

        } else { 
            // Si entra por este camino es porque debo actualizar solo la cantidad quantity en +1

            const quantity = productFind.quantity;
            const newQuantity = quantity + 1;  // Aumento en +1 la cantidad
            productFind.quantity = newQuantity;  // Actualizo la Cantidad en mi array de productos
            
            // Actualizo mi base de datos "Carts.json" con el carrito actualizado
            const updateCarts = [...carts];
            await fs.promises.writeFile(this.#path, JSON.stringify(updateCarts))
            res.send(`Product id ${pid} updated`);
        }
    }
}

export default CartManager;