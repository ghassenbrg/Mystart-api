const mongoose = require('mongoose');

const CategorieSchema = mongoose.Schema({
    
    categorie_name:String,
}, {
    timestamps: false
});

module.exports = mongoose.model('Categories', CategorieSchema);