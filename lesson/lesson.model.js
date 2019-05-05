const mongoose = require('mongoose');

const LessonSchema = mongoose.Schema({
    

    nbr_lesson:Number,
    title: String, 
    videoUrl:String,
    notes:String,
    courseid:String,
    attachement:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Lessons', LessonSchema);