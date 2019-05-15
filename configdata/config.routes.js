const Config = require('./config.model.js');

// ______________________________Create new config
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "user cannot"
        });
    }

    // Create a config
    const config = new Config({ 
        websiteTitle: req.body.websiteTitle,
        domainName: req.body.domainName,
        logo: req.body.logo,
        slider : req.body.slider,
        successStoryNbr: req.body.successStoryNbr,
        entrepreneur: req.body.entrepreneur,
        investor: req.body.investor,
        expert: req.body.expert,
        video: req.body.video,
        feedback: req.body.feedback,
        socialMedia: req.body.socialMedia
    });
    // Save Config in the database
    config.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the project."
        });
    });
};








// ______________________________Fetch Config
exports.find = (req,res) => {
    Config.findOne()
    .then(config => {
        res.send(config);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving config."
        });
    });
};

// ______________________________Fetch menus config
exports.findMenus = (req,res) => {
    Config.findOne({},{
        websiteTitle: 1,
        logo: 1,
        logoFooter: 1,
        domainName: 1,
        socialMedia: 1,
        playStore: 1,
        appStore: 1,
        _id: 0,
    })
    .then(config => {
        res.send(config);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving projects."
        });
    });
};

// ______________________________Update Config
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "config content can not be empty"
        });
    }

    // Find and update config with the request body
    Config.findByIdAndUpdate(req.params.id, {
        websiteTitle: req.body.websiteTitle,
        domainName: req.body.domainName,
        logo: req.body.logo,
        slider : req.body.slider,
        successStoryNbr: req.body.successStoryNbr,
        entrepreneur: req.body.entrepreneur,
        investor: req.body.investor,
        expert: req.body.expert,
        video: req.body.video,
        feedback: req.body.feedback,
        socialMedia: req.body.socialMedia
    }, {new: true})
    .then(config => {
        if(!config) {
            return res.status(400).send({
                message: " nothing to update " + req.body._id
            });
        }
        res.send(config);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.body._id
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.body._id
        });
    });
};

// ______________________________Delete Config
exports.delete = (req, res) => {
    Config.findByIdAndRemove(req.params.id)
    .then(config => {
        if(!config) {
            return res.status(400).send({
                message: "Project not found with id " + req.params.id
            });
        }
        res.send({message: "Project deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "error with deleting " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "error " + req.params.id
        });
    });
};