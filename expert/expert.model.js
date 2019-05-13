const mongoose = require('mongoose');

const ExpertSchema = mongoose.Schema({
    username: String ,
    mdp: String ,
    firstname:String,
    lastname:String,
    email: String,
    phone:Number,
    country:String,
    city:String,
    profilpic:String,
    description:String,
    cvurl:String,
    sexe: String,
    dateofb:Date,
    netincome:Number,
    withdrawn:Number,
    availableforwithdrawal:Number,
    skills:String,
    verified:Boolean,
    banned:Boolean
    
}, {
    timestamps: true
});


module.exports = mongoose.model('Experts', ExpertSchema);