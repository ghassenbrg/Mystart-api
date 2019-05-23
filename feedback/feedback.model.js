const mongoose = require('mongoose');

const FeedbackSchema = mongoose.Schema({
    
    userid:String,
    description: String, 
    rate: Number, 
   
    

}, {
    timestamps: true
});

module.exports = mongoose.model('Feedbacks', FeedbackSchema);