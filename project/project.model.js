const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
  
    title: String, 
    description: String,
    coverimg:String,
    categorie:String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Projects', ProjectSchema);