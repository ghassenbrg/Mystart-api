const mongoose = require('mongoose');
const ExpertSchema=mongoose.Schema({
    netincome:Number,
    withdrawn:Number,
    availableforwithdrawal:Number,
});
const UserSchema = mongoose.Schema({
    username: String ,
    password: String,
    firstname:String,
    lastname:String,
    email:String,
    phone:Number,
    country:String,
    city:String,
    profilpic:String,
    description:String,
    cvurl:String,
    sexe: String,
    dateofb:Date,
    isadmin:Boolean,
    expert:[ExpertSchema],
    skills:String
}, {
    timestamps: true
});


module.exports = mongoose.model('Users', UserSchema);