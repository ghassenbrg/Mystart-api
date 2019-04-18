const Event = require('./event.model.js');

//Create new user
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "event cannot created"
        });
    }

    // Create a user
    const event = new Event({
        
        title: req.body.title, 
        description: req.body.description, 
        coverimg:req.body.coverimg, 
        placeName:req.body.placeName,
        mapcode:req.body.mapcode,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        organizer:req.body.organizer,
        adminid:req.body.adminids
       
    });

    // Save User in the database
    event.save()
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
    Event.find()
    .then(events => {
        res.send(events);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving events."
        });
    });
};

// Find a single event by id
exports.findOne = (req, res) => {
    Events.findById(req.params.eventId)
    .then(event => {
        if(!event) {
            return res.status(404).send({
                message: "event not found with id " + req.params.eventId
            });            
        }
        res.send(event);
    }).catch(err => {
        if(err.kind === 'eventId') {
            return res.status(404).send({
                message: "event not found with id " + req.params.eventId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving event with id " + req.params.eventId
        });
    });
};

// Update a user
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "event content can not be empty"
        });
    }

    // Find and update user with the request body
    Event.findByIdAndUpdate(req.params.eventId, {
       title: req.body.title, 
        description: req.body.description, 
        coverimg:req.body.coverimg, 
        placeName:req.body.placeName,
        mapcode:req.body.mapcode,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        organizer:req.body.organizer
    }, {new: true})
    .then(event => {
        if(!event) {
            return res.status(404).send({
                message: "event not found with id " + req.params.eventId
            });
        }
        res.send(event);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "event not found with id " + req.params.eventId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating  " + req.params.eventId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Event.findByIdAndRemove(req.params.eventId)
    .then(event => {
        if(!event) {
            return res.status(404).send({
                message: "event not found with id " + req.params.eventId
            });
        }
        res.send({message: "event deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "event not found with id " + req.params.eventId
            });                
        }
        return res.status(500).send({
            message: "Could not find event with id " + req.params.eventId
        });
    });
};