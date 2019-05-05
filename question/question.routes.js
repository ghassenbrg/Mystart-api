const Question = require('./question.model.js');

//Create new user
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "question cannot created"
        });
    }

    // Create a user
    const question = new Question({
        userid:req.body.userid,
        content:req.body.content,
       
    });

    // Save qestion in the database
    question.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the question."
        });
    });
};

// Retrieve all users from the database.
exports.findAll = (req,res) => {
    Question.find()
    .then(questions => {
        res.send(questions);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving question."
        });
    });
};

// Find a single question by id
exports.findOne = (req, res) => {
    Question.findById(req.params.questionId)
    .then(question => {
        if(!question) {
            return res.status(404).send({
                message: "question not found with id " + req.params.questionId
            });            
        }
        res.send(question);
    }).catch(err => {
        if(err.kind === 'questionId') {
            return res.status(404).send({
                message: "question not found with id " + req.params.questionId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving question with id " + req.params.questionId
        });
    });
};

// Update a user
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "question content can not be empty"
        });
    }

    // Find and update user with the request body
    Question.findByIdAndUpdate(req.params.questionId, {
        userid:req.body.userid, 
        content:req.body.content, 
    }, {new: true})
    .then(question => {
        if(!question) {
            return res.status(404).send({
                message: "question not found with id " + req.params.questionId
            });
        }
        res.send(question);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "question not found with id " + req.params.questionieId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating  " + req.params.questionId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Question.findByIdAndRemove(req.params.questionId)
    .then(question => {
        if(!question) {
            return res.status(404).send({
                message: "question not found with id " + req.params.questionId
            });
        }
        res.send({message: "question deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "question not found with id " + req.params.questionId
            });                
        }
        return res.status(500).send({
            message: "Could not find question with id " + req.params.questionId
        });
    });
};