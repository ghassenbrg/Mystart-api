const mongoose = require('mongoose');

const ConfigSchema = mongoose.Schema({
    websiteTitle: String,
    domainName: String,
    logo: String,
    logoFooter: String,
    slider : {
        title : String,
        desc : String,
        img: String
    },
    successStoryNbr: Number,
    entrepreneur: {
        title: String,
        desc: String,
        img: String
    },
    investor: {
        title: String,
        desc: String,
        img: String
    },
    expert: {
        title: String,
        desc: String,
        img: String
    },
    video: {
        title: String,
        desc: String,
        url: String
    },
    feedback: [{
        name: String,
        position: String,
        review: String,
        img: String
    }],
    socialMedia: {
        facebook: String,
        linkedin: String,
        youtube: String,
        twitter: String,
        instagram: String
    },
    playStore: String,
    appStore: String
}, {
    timestamps: true
});


module.exports = mongoose.model('configs', ConfigSchema); 