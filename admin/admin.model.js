const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    adminname: String ,
    mdp: String ,
    firstname:String,
    lastname:String,
    email:String,
    
    
}, {
    timestamps: true
});


module.exports = mongoose.model('Admins', AdminSchema);