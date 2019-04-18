const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    

    
    
    title: String, 
    description: String,
    coverimg:String,
    placeName:String,
    mapcode:String,
    startDate:Date, 
    endDate:Date,
    organizer:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Events', EventSchema);