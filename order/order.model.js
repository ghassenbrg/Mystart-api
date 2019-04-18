const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    
    offferid:String,
    productType: String, 
    cost: Number, 
    orderStatu:String,
    purchasedate:Date,
    

}, {
    timestamps: true
});

module.exports = mongoose.model('Orders', OrderSchema);