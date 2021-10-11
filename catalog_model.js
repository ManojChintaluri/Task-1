const mongoose = require('mongoose');

const CatalogSchema = mongoose.Schema({
    item_Id:{
        type: String,
        require:true
    },
    item_Name:{
        type:String,
        require:true
    },
    item_Price:{
        type:Number,
        require:true
    }

})

module.exports = mongoose.model('Catalog_model', CatalogSchema )
