const mongoose = require('mongoose');

const LessonSchema = mongoose.Schema({
    

    
    title: String, 
    videoUrl:String,
    notes:Number,
    courseid:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Lessons', LessonSchema);