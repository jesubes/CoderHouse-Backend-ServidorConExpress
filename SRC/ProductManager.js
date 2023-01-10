const fs = require('fs');



class ProductManager{
    constructor( products=[], id = 0, path ='./productos.json') {
        this.products = products;
        this.id = id
        this.path = path;
    }

    async addProduct(title, description, price, thumbnail, code, stock){
        const db = await this.getProducts();
        try{
            if(title && description && description && thumbnail && code && stock) {
                let product = { 
                        code: code,
                        title: title,
                        description: description,
                        thumbnail: thumbnail,
                        stock: stock,
                        price: price
                    }
                let newId;
                db.length == 0?
                    newId = 1 :
                    newId = db[db.length-1].id + 1;
                const newProduct = { ...product, id: newId};
                db.push(newProduct);
                await fs.promises.appendFile('./productos.json',JSON.stringify(db));
                }
        }

        catch(err) {
            console.log(err.message);
        }
    }

    async getProducts() {
        if (fs.existsSync('./paodrudos.json')) {
            let listado = await fs.promises.readFile('./productos.json', 'utf-8');
            let listadoObj = JSON.parse(listado);
            this.products = listadoObj;
            return this.products;
        }
    }

    async getProductById(id) {
        const db = await this.getProducts();
        if (db.find((product) => product.id == id)) {
            return db.find((product) => product.id)
        } else console.log("No existe ID del producto");

    }

    async updateProduct(id, newProduct){
        const db = await this.getProducts();
        if (db.find((product) => product.id == id)){
            let indexProduct = db.findIndex(() => db.find((product) => product.id == id))
            db[indexProduct] = newProduct;
        }
        await fs.promises.writeFile('./productos.json', JSON.stringify(db))

    }

    async deleteProduct(id){
        let listado = await fs.promises.readFile('./productos.json', 'utf-8');
        let listadoObj = JSON.parse(listado);
        const resultado = listadoObj.filter(lista => lista.id !== id);
        await fs.promises.writeFile('./productos.json', JSON.stringify(resultado))
    }

}

module.exports = ProductManager;