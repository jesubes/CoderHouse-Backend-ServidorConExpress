const express = require ('express');
const ProductManager = require('./ProductManager');

const app =  express();
const port = 8080;

const pm = new ProductManager('./productos.json')

app.get('/',(request, response) => {
    response.send("Servidor Con Express!!!");
})

app.get('/products', async (request, response) => {
    const data = await pm.getProducts();
    response.send(data)
})

app.get('./products/:pid', async (requiest, response) => {
    const productoUnitario = requiest.params['pid'];
    const data = await pm.getProductById(productoUnitario);
    response.send(data);
})

app.listen(port,() => console.log(`Servicio Levantado en el Puerto ${port}`));