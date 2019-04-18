const Lesson = require('./lesson.model.js');

//Create new user
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "lesson cannot created"
        });
    }

    // Create a user
    const lesson = new Lesson({
        
        title: req.body.title, 
        videoUrl:req.body.videoUrl,
        notes:req.body.notes,
        courseid:req.body.courseid
       
    });

    // Save User in the database
    lesson.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the event."
        });
    });
};

// Retrieve all users from the database.
exports.findAll = (req,res) => {
    Lesson.find()
    .then(lessons => {
        res.send(lessons);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving events."
        });
    });
};

// Find a single event by id
exports.findOne = (req, res) => {
    Lessons.findById(req.params.lessonId)
    .then(lesson => {
        if(!lesson) {
            return res.status(404).send({
                message: "event not found with id " + req.params.eventId
            });            
        }
        res.send(lesson);
    }).catch(err => {
        if(err.kind === 'lessonId') {
            return res.status(404).send({
                message: "lesson not found with id " + req.params.lessonId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving lesson with id " + req.params.lessonId
        });
    });
};

// Update a user
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "lesson content can not be empty"
        });
    }

    // Find and update user with the request body
    Lesson.findByIdAndUpdate(req.params.lessonId, {
        title: req.body.title, 
        videoUrl:req.body.videoUrl,
        notes:req.body.notes,
        courseid:req.body.courseid
       
    }, {new: true})
    .then(lesson => {
        if(!lesson) {
            return res.status(404).send({
                message: "lesson not found with id " + req.params.lessonId
            });
        }
        res.send(lesson);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "lesson not found with id " + req.params.lessonId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating  " + req.params.lessonId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Lesson.findByIdAndRemove(req.params.lessonId)
    .then(lesson => {
        if(!lesson) {
            return res.status(404).send({
                message: "lesson not found with id " + req.params.lessonId
            });
        }
        res.send({message: "lesson deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "lesson not found with id " + req.params.lessonId
            });                
        }
        return res.status(500).send({
            message: "Could not find lesson with id " + req.params.lessonId
        });
    });
};