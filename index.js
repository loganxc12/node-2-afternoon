const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const controller = require('./products_controller');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
//Feed connection string into massive and make EXPRESS LEVEL VARIABLE equal to the DATABASE OBJECT returned in promise by massive - contains
//all the information we need to run SQL queries. 
massive(process.env.CONNECTION_STRING).then(dbInstance => { //Invoke massive and pass it connection string, this will return a PROMISE
     app.set("db", dbInstance); //Set instance of database onto app (express instance)
}).catch(error => console.log("error in massive connection", error));

//ENDPOINTS 
app.get("/api/products", controller.getAll);
app.get("/api/products/:id", controller.getOne);
app.put("/api/products/:id", controller.update);
app.post("/api/products", controller.create);
app.delete("/api/products/:id", controller.delete);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));