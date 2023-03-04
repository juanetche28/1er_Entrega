import fs from "fs";

class ProductManager {
    #path = "./Products.json";
    constructor(path) {
        this.#path = path;
    }
    #nextId = 0;
    
    async getProducts() {
        try {
            const products = await fs.promises.readFile(this.#path, "utf-8");
            return JSON.parse(products);
        } catch (e) {
            return [];
        }
    }

    async getProductById(productId) {
        const products = await this.getProducts();
        const result = (products.find((p) => p.id === productId));
        return new Promise ((resolve, reject) => {
            if (result == null) {
                reject("Product id not found.");
            }
            resolve(result);
        });
    }
    
    async addProduct(title, description, code, price, status, stock, category, thumbnail) {
        const products = await this.getProducts();

        if (!title || !description || !code || !price || !status || !stock || !category || !thumbnail) {
            throw new Error("Missing parameters, check that there is no missing load title, description, price, thumbnail, code or stock");
        }

        const productWithSameCode = products.some((p) => {
           return p.code === code;
        });

        if (productWithSameCode) {
            throw new Error("Product with the same existing code.");
        }

        const newProduct = {
            id: this.#nextId,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnail
        };

        const updateProducts = [...products, newProduct];
        await fs.promises.writeFile(this.#path, JSON.stringify(updateProducts));
        this.#nextId += 1;
    }

    async updateProduct(productId, dataToUpdate){
        const products = await this.getProducts();

        const check = products.findIndex(elemento => {
            return elemento.id === productId;   // Agrego este codigo solamente para mostrar mensaje de error si no encuentra el ID
        });
        if (check === -1) {
            console.log(`item with id ${productId} wasn't found`);
        }

        const p = products.map(elemento => {
            if (elemento.id === productId) {
                console.log(`item with id ${productId} updated successfully!`);
                return {
                    ...elemento,
                    ...dataToUpdate,
                    id: productId,
                  };
            } 
            return elemento
        });
        await fs.promises.writeFile(this.#path, JSON.stringify(p)); // Sobreescribo mi archivo .json, pero con el elemento que me retorna p al hacer el mapeo y agregar las caracteristicas que recibí como par    
    }

    async deleteProduct(productId) {
        const products = await this.getProducts();
        const p = products.findIndex(elemento => {
            return elemento.id === productId;
        });
        if (p === -1) {
            console.log(`item with id ${productId} wasn't found`);
        } else {
            products.splice(p, 1); // Borro mi objeto con ID P = productId
            await fs.promises.writeFile(this.#path, JSON.stringify(products)); // Sobreescribo mi archivo .json
            console.log(`item with id ${productId} deleted successfully!`);
        };
    }
}

export default ProductManager;

async function main(){
}
main();


