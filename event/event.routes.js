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
        adminid:req.body.adminid,
        organizerName:req.body.organizerName,
        overview:req.body.overview,
        location:req.body.location,
        organizerPic:req.body.organizerPic,
        totalSlot:req.body.totalSlot,
        cost:req.body.cost,
        views:req.body.views,
        title: req.body.title, 
        description: req.body.description, 
        coverimg:req.body.coverimg, 
        mapcode:req.body.mapcode,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        published:req.body.published
      
       
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
    Event.findById(req.params.eventId)
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
exports.findTodayEvents = (req,res) => {
    Event.find({data:{ $exists: true}})
    .then(events => {
        res.send(events);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving events."
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
        adminid:req.body.adminid,
        organizerName:req.body.organizerName,
        overview:req.body.overview,
        location:req.body.location,
        startTime:req.body.startTime,
        endTime:req.body.endTime,
        organizerPic:req.body.organizerPic,
        totalSlot:req.body.totalSlot,
        cost:req.body.cost,
        views:req.body.views,
        title: req.body.title, 
        description: req.body.description, 
        coverimg:req.body.coverimg, 
        mapcode:req.body.mapcode,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        published:req.body.published
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


exports.publish = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "event content can not be empty"
        });
    }




Event.findByIdAndUpdate(req.params.eventId, {
    
    published:true,
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

exports.unpublish = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "event content can not be empty"
        });
    }




Event.findByIdAndUpdate(req.params.eventId, {
    
    published:false,
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