const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    

    
    
    adminid:String,
    mapRef:String,
    organizerName:String,
    title: String,
    overview:String,
    location:String,
    startTime:Date,
    endTime:Date,
    organizerPosition:String,
    organizerPic:String,
    description: String,
    coverimg:String,
    totalSlot:Number,
    cost:Number,
    views:Number,
    published:Boolean,
  
}, {
    timestamps: true
});

module.exports = mongoose.model('Events', EventSchema);