const mongoose = require('mongoose');

const  CourseSchema = mongoose.Schema({
    

    title:String,
    description: String, 
    coverImg:String,
    price:Number,
    courseid:String,
   published:Boolean,
   lessons:Array,
   verified:Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Courses', CourseSchema);