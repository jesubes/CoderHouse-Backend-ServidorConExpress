const express = require ('express');
const ProductManager = require('./ProductManager');

const app =  express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({extended: true}))

const pm = new ProductManager('./productos.json')

app.get('/',(request, response) => {
    response.send("Servidor Con Express!!!");
})

app.get('/products', async (request, response) => {

    const { limit } = request.query;
    const data = await pm.getProducts();

    if (!limit) {
        response.send(data)
    }
    else {
        for (i = 0; i <= limit; i++) {
            response.send(data[i])
        }
    }
})

app.get('./products/:pid', async (requiest, response) => {
    const pid = requiest.params.pid;
    const data = await pm.getProductById(parseInt(pid));
    response.send(data);
})

app.listen(port,() => console.log(`Servicio Levantado en el Puerto ${port}`));