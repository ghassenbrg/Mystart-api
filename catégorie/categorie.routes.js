const Categorie = require('./categorie.model.js');

//Create new user
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "categorie cannot created"
        });
    }

    // Create a user
    const categorie = new Categorie({
        categorie_name:req.body.categorie, 
       
    });

    // Save categorie in the database
    categorie.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the categorie."
        });
    });
};

// Retrieve all users from the database.
exports.findAll = (req,res) => {
    Categorie.find()
    .then(categories => {
        res.send(categories);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving categories."
        });
    });
};

// Find a single categorie by id
exports.findOne = (req, res) => {
    Categorie.findById(req.params.categorieId)
    .then(categorie => {
        if(!categorie) {
            return res.status(404).send({
                message: "categorie not found with id " + req.params.categorieId
            });            
        }
        res.send(categorie);
    }).catch(err => {
        if(err.kind === 'categorieId') {
            return res.status(404).send({
                message: "categorie not found with id " + req.params.categorieId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving categorie with id " + req.params.categorieId
        });
    });
};

// Update a user
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "categorie content can not be empty"
        });
    }

    // Find and update user with the request body
    Categorie.findByIdAndUpdate(req.params.categorieId, {
       categorie_name:req.body.categorie_name, 
    }, {new: true})
    .then(categorie => {
        if(!categorie) {
            return res.status(404).send({
                message: "categorie not found with id " + req.params.categorieId
            });
        }
        res.send(categorie);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "categorie not found with id " + req.params.categorieId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating  " + req.params.categorieId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Categorie.findByIdAndRemove(req.params.categorieId)
    .then(categorie => {
        if(!categorie) {
            return res.status(404).send({
                message: "categorie not found with id " + req.params.categorieId
            });
        }
        res.send({message: "categorie deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "categorie not found with id " + req.params.categorieId
            });                
        }
        return res.status(500).send({
            message: "Could not find categorie with id " + req.params.categorieId
        });
    });
};