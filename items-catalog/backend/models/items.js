const mongoose = require('mongoose');

const ItemsSchema = mongoose.Schema({
    name: {
        type: String,
        require:true
    },
    description: {
        type: String,
        require:true
    },
    dimension: {
        type: String,
        require:true
    },
    available: {
        type: Boolean,
        require:true
    },
    color: {
        type: [String],
        require:true
    },
    catalogID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Catalog',
        require:true
    },

},{
    timestamps:true
})

module.exports = mongoose.model("Items", ItemsSchema)

