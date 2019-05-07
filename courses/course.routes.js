const Course = require('./course.model.js');

//Create new user
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "course cannot created"
        });
    }

    // Create a user
    const course = new Course({

        
    title:req.body.title,
    description: req.body.description, 
    coverImg:req.body.coverImg,
    price:req.body.price,
   published:req.body.published,
   lessons:req.body.lessons
        
   
       
    });

    // Save User in the database
    course.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the event."
        });
    });
};

// Retrieve all courses from the database.
exports.findAll = (req,res) => {
    Course.find()
    .then(courses => {
        res.send(courses);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving events."
        });
    });
};

// Find a single event by id
exports.findOne = (req, res) => {
    Courses.findById(req.params.courseId)
    .then(course => {
        if(!course) {
            return res.status(404).send({
                message: "event not found with id " + req.params.eventId
            });            
        }
        res.send(course);
    }).catch(err => {
        if(err.kind === 'courseId') {
            return res.status(404).send({
                message: "course not found with id " + req.params.courseId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving course with id " + req.params.courseId
        });
    });
};

// Update a user
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "course content can not be empty"
        });
    }

    // Find and update user with the request body
    Course.findByIdAndUpdate(req.params.courseId, {


        title:req.body.title,
        description: req.body.description,
        coverImg:req.body.coverImg,
        price:req.body.price,
        published:req.body.published,
      


    }, {new: true})
    .then(course => {
        if(!course) {
            return res.status(404).send({
                message: "course not found with id " + req.params.courseId
            });
        }
        res.send(course);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "course not found with id " + req.params.courseId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating  " + req.params.courseId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Course.findByIdAndRemove(req.params.courseId)
    .then(course => {
        if(!course) {
            return res.status(404).send({
                message: "course not found with id " + req.params.courseId
            });
        }
        res.send({message: "course deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "course not found with id " + req.params.courseId
            });                
        }
        return res.status(500).send({
            message: "Could not find course with id " + req.params.courseId
        });
    });
};