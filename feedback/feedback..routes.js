const Feedback = require('./feedback.model.js');

//Create new user
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "Feedback cannot created"
        });
    }

    // Create a user
    const feedback = new Feedback({
      
        
        userid: req.body.userid, 
        rate: req.body.rate, 
        description:req.body.description,
        
       
    });

    // Save User in the database
    feedback.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the order."
        });
    });
};

// Retrieve all users from the database.
exports.findAll = (req,res) => {
    Feedback.find()
    .then(feedbacks => {
        res.send(feedbacks);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving orders."
        });
    });
};

// Find a single order by id
exports.findOne = (req, res) => {
    Feedbacks.findById(req.params.feedbackId)
    .then(feedback => {
        if(!feedback) {
            return res.status(404).send({
                message: "feedback not found with id " + req.params.feedbackId
            });            
        }
        res.send(feedback);
    }).catch(err => {
        if(err.kind === 'feedbackId') {
            return res.status(404).send({
                message: "feedback not found with id " + req.params.feedbackId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving feedback with id " + req.params.feedbackId
        });
    });
};

// Update a user
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "feedback content can not be empty"
        });
    }

    // Find and update user with the request body
    Feedback.findByIdAndUpdate(req.params.feedbackId, {
        
        userid: req.body.userid, 
        rate: req.body.rate, 
        description:req.body.description,
        
    }, {new: true})
    .then(feedback => {
        if(!feedback) {
            return res.status(404).send({
                message: "feedback not found with id " + req.params.feedbackId
            });
        }
        res.send(feedback);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "feedback not found with id " + req.params.feedbackId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating  " + req.params.feedbackId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Feedback.findByIdAndRemove(req.params.feedbackId)
    .then(feedback => {
        if(!feedback) {
            return res.status(404).send({
                message: "feedback not found with id " + req.params.feedbackId
            });
        }
        res.send({message: "feedback deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "feedback not found with id " + req.params.feedbackId
            });                
        }
        return res.status(500).send({
            message: "Could not find feedback with id " + req.params.feedbackId
        });
    });
};




