const mongoose = require('mongoose');
const CourseSchema=mongoose.Schema({
    createrid:Number,
    adminid:String,
    enrollerid:String,
    lessonid:String,
});
const EvaluateSchema=mongoose.Schema({
    rating:Number,
    review:String,
    dateev:Date,});
const OfferSchema=mongoose.Schema({
    price:Number,
    adminid:String,
    enrollerid:String,
    evaluate:[EvaluateSchema],
    course:[CourseSchema]
});

const CommentSchema=mongoose.Schema({
    content:String,
    dateco:Date,
    userid:String
})
const ProjectSchema=mongoose.Schema({
    createrid:String,
    comment:[CommentSchema],
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