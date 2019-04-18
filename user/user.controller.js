const User = require('./user.model.js');

//Create new user
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "user cannot"
        });
    }

    // Create a user
    const user = new User({
        username: req.body.nom, 
        password: req.body.pre,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        phone:req.body.phone,
        country:req.body.country,
        city:req.body.city,
        profilpic:req.body.profilpic,
        description:req.body.description,
        cvurl:req.body.cvurl,
        dateofb:req.body.dateofbs,
        isadmin:req.body.isadmin,
        expert:[{netincome:req.body.notincome,withdrawn:req.body.withdrawn,availableforwithdrawal:req.body.withdrawal.availableforwithdrawal}]
        
        
    });
    // Save User in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the user."
        });
    });
};
exports.findAll = (req,res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving userss."
        });
    });
};
// Retrieve all experts from the database.
exports.findAllexpert = (req,res) => {
    User.find({expert:{ $exists: true}})
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving experts."
        });
    });
};
//return admin 
exports.findadmin = (req, res) => {
    User.find( { $and: [ { _id:req.params.userId }, { isadmin: { $exists: true } } ] } )
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "amin not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving admin with id " + req.params.userId
        });
    });
};
exports.findexpert = (req, res) => {
    User.find( { $and: [ { _id:req.params.userId }, { expert: { $exists: true } } ] } )
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving user with id " + req.params.userId
        });
    });
};


exports.finduser= (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving user with id " + req.params.userId
        });
    });
};

// Update a user
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    // Find and update user with the request body
    User.findByIdAndUpdate(req.params.userId, {
        username: req.body.nom, 
        password: req.body.pre,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        phone:req.body.phone,
        country:req.body.country,
        city:req.body.city,
        profilpic:req.body.profilpic,
        description:req.body.description,
        cvurl:req.body.cvurl,
        dateofb:req.body.dateofbs,
        expert:[{netincome:req.body.notincome,withdrawn:req.body.withdrawn,availableforwithdrawal:req.body.withdrawal.availableforwithdrawal}],
        isadmin:req.body.isadmin,
        skills:req.body.skills
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(400).send({
                message: " nothing to update " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.userId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(400).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "error with deleting " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "error " + req.params.userId
        });
    });
};
