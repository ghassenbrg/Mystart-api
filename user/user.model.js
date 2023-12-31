const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String ,
    mdp: String ,
    firstname:String,
    lastname:String,
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    phone:Number,
    country:String,
    city:String,
    profilpic:String,
    description:String,
    cvurl:String,
    sexe: String,
    dateofb:Date,
    banned:Boolean
   
    
}, {
    timestamps: true
});


module.exports = mongoose.model('Users', UserSchema);