const mongoose = require('mongoose');

const CatalogSchema = mongoose.Schema({
    name: {
        type: String,
        require:true
    }  
},{
    timestamps:true
})

module.exports = mongoose.model("Catalog", CatalogSchema)
