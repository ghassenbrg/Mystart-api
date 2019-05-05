const mongoose = require('mongoose');

const ServiceSchema = mongoose.Schema({
    
    userid:Number,
    price: Number, 
    serviceStatus:String,
    
    

}, {
    timestamps: true
});

module.exports = mongoose.model('Services', ServiceSchema);