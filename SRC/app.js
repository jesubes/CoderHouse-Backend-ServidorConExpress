const express = require ('express');

const app =  express();
const port = 8080;

app.get('/',(request, response) => {
    response.send("Servidor Con Express!!!");
})

app.get('/pruducts/?limit='){
    
}

