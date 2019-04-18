const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
    adminid:String,
    title: String, 
    description: String,
    coverimg:String,
    views:Number,
    visibility:Boolean,
    authorized:String,
    categorie:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Articles', ArticleSchema);