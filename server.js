var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Catalog_model = require('./models/catalog_model');
var db = mongoose.connect('mongodb://mongo:27017/test2');

const HOST = '0.0.0.0';
const PORT = 8080;




app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:false}));


app.get('/', function(req, res){
    Catalog_model.find({},function(err, catalog_models) {

        if(err) {
            res.status(500).send({
                error: "could not fetch details"
            });
        }

        else  {
                res.send(catalog_models);
            }
    });
});

   
app.post('/', function(req, res) {

    var catalog_model = new Catalog_model();
    catalog_model.item_Id = req.body.item_Id;
    catalog_model.item_Name = req.body.item_Name;
    catalog_model.item_Price = req.body.item_Price;
    catalog_model.save(function(err, newCatalog_model) {
        if (err) {
            res.status(500).send({
                error:"Cant save products"
            });
        }
        else {
            res.send(newCatalog_model);
        }
    });
});

app.listen(8080,() => {
    console.log(`Running on http://${HOST}:${PORT}`)
});
