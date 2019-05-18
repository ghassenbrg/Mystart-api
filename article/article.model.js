const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
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
    coverImg:String,
    totalSlot:Number,
    cost:Number,
    views:Number,
    
    visibility:Boolean,
    authorized:String,
    verified:Boolean,
    categorie:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Articles', ArticleSchema);