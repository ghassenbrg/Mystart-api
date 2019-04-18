const Item= require('./item.model.js');

//Create new user
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "item cannot created"
        });
    }

    // Create a user
    const item = new Item ({
        title: req.body.title, 
        description: req.body.description, 
        coverimg:req.body.coverimg, 
        categorie:req.body.categorie,
       
       
    });

    // Save User in the database
    item.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the item."
        });
    });
};

// Retrieve all users from the database.
exports.findAll = (req,res) => {
    Item.find()
    .then(items => {
        res.send(items);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving items."
        });
    });
};

// Find a single item by id
exports.findOne = (req, res) => {
    Item.findById(req.params.itemId)
    .then(item => {
        if(!item) {
            return res.status(404).send({
                message: "item not found with id " + req.params.itemId
            });            
        }
        res.send(item);
    }).catch(err => {
        if(err.kind === 'itemId') {
            return res.status(404).send({
                message: "item not found with id " + req.params.itemId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving item with id " + req.params.itemId
        });
    });
};

// Update a user
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "item content can not be empty"
        });
    }

    // Find and update user with the request body
    Item.findByIdAndUpdate(req.params.itemId, {
        title: req.body.title, 
        description: req.body.description, 
        coverimg:req.body.coverimg, 
        categorie:req.body.categorie, 
    }, {new: true})
    .then(item => {
        if(!item) {
            return res.status(404).send({
                message: "item not found with id " + req.params.itemId
            });
        }
        res.send(item);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "item not found with id " + req.params.itemId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating  " + req.params.itemId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Item.findByIdAndRemove(req.params.itemId)
    .then(item => {
        if(!item) {
            return res.status(404).send({
                message: "item not found with id " + req.params.itemId
            });
        }
        res.send({message: "item deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "item not found with id " + req.params.itemId
            });                
        }
        return res.status(500).send({
            message: "Could not find item with id " + req.params.itemId
        });
    });
};