const mongoose = require('mongoose');
const OfferSchema=mongoose.Schema({
    price:Number,
    adminid:String,
    enrollerid:String,
    evaluate:[rating,review,dateev],
    course:[CourseSchema]
});
const CourseSchema=mongoose.Schema({
    createrid:Number,
    adminid:String,
    enrollerid:String,
    lessonid:String,
});
const ProjectSchema=mongoose.Schema({
    createrid:String,
    comment:[content,dateco,userid],
    adminid:String,
});
const ItemSchema = mongoose.Schema({
    adminid:String,
    title: String, 
    description: String,
    coverimg:String,
    categorie:String,
    userid:String,
    expertid:String,
    project:[ProjectSchema],
    OfferSchema:[OfferSchema],
    attachement:String

}, {
    timestamps: true
});

module.exports = mongoose.model('Items', ItemSchema);