const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    
    offferid:String,
    productType: String, 
    cost: Number, 
    orderStatu:Boolean,
    

}, {
    timestamps: true
});

module.exports = mongoose.model('Orders', OrderSchema);