const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
    userid:String,
    content:String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Questions', QuestionSchema);