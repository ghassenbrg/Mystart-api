const Project = require('./project.model.js');

//Create new user
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "project cannot created"
        });
    }

    // Create a user
    const project = new Project({
        title: req.body.title, 
        description: req.body.description,
        coverimg:req.body.coverimg,
        categorie:req.body.categorie,
        verified:false,
    });

    // Save User in the database
    project.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the project."
        });
    });
};

// Retrieve all users from the database.
exports.findAll = (req,res) => {
    Project.find()
    .then(projects => {
        res.send(projects);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving projects."
        });
    });
};

// Find a single project by id
exports.findOne = (req, res) => {
    Project.findById(req.params.projectId)
    .then(project => {
        if(!project) {
            return res.status(404).send({
                message: "project not found with id " + req.params.projectId
            });            
        }
        res.send(project);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "project not found with id " + req.params.projectId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving project with id " + req.params.projectId
        });
    });
};

// Update a user
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "project content can not be empty"
        });
    }

    // Find and update user with the request body
    Project.findByIdAndUpdate(req.params.projectId, {
        title: req.body.title, 
        description: req.body.description,
        coverimg:req.body.coverimg,
        categorie:req.body.categorie
    }, {new: true})
    .then(project => {
        if(!project) {
            return res.status(404).send({
                message: "project not found with id " + req.params.projectId
            });
        }
        res.send(project);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "project not found with id " + req.params.projectId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating  " + req.params.projectId
        });
    });
};

//verify project 

exports.verify = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "project content can not be empty"
        });
    }

    // Find and update user with the request body
    Project.findByIdAndUpdate(req.params.projectId, {
        verified:true
    }, {new: true})
    .then(project => {
        if(!project) {
            return res.status(404).send({
                message: "project not found with id " + req.params.projectId
            });
        }
        res.send(project);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "project not found with id " + req.params.projectId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating  " + req.params.projectId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Project.findByIdAndRemove(req.params.projectId)
    .then(project => {
        if(!project) {
            return res.status(404).send({
                message: "project not found with id " + req.params.projectId
            });
        }
        res.send({message: "project deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "project not found with id " + req.params.projectId
            });                
        }
        return res.status(500).send({
            message: "Could not find project with id " + req.params.projectId
        });
    });
};