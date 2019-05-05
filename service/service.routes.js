const Service = require('./service.model.js');

//Create new user
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "service cannot created"
        });
    }

    // Create a user
    const service = new Service({
        userid:req.body.userid,
        price: req.body.price, 
        serviceStatus:req.body.serviceStatus,

       
       
    });

    // Save User in the database
    service.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the service."
        });
    });
};

// Retrieve all users from the database.
exports.findAll = (req,res) => {
    Service.find().sort({})
    .then(services => {
        res.send(services);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving services."
        });
    });
};

// Find a single service by id
exports.findOne = (req, res) => {
    Services.findById(req.params.serviceId)
    .then(service => {
        if(!service) {
            return res.status(404).send({
                message: "service not found with id " + req.params.serviceId
            });            
        }
        res.send(service);
    }).catch(err => {
        if(err.kind === 'serviceId') {
            return res.status(404).send({
                message: "service not found with id " + req.params.serviceId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving service with id " + req.params.serviceId
        });
    });
};

// service change statu
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "service content can not be empty"
        });
    }

    // Find and update service with the request body
    Service.findByIdAndUpdate(req.params.serviceId, {
        userid:req.params.userid,
        price:req.params.price, 
        serviceStatus:req.body.serviceStatus,

    }, {new: true})
    .then(service => {
        if(!service) {
            return res.status(400).send({
                message: "service not found with id " + req.params.serviceId
            });
        }
        res.send(service);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "error " + req.params.serviceId
            });                
        }
        return res.status(404).send({
            message: "Something wrong updating  " + req.params.serviceId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Service.findByIdAndRemove(req.params.serviceId)
    .then(service => {
        if(!service) {
            return res.status(404).send({
                message: "service not found with id " + req.params.serviceId
            });
        }
        res.send({message: "service deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "service not found with id " + req.params.serviceId
            });                
        }
        return res.status(500).send({
            message: "Could not find service with id " + req.params.serviceId
        });
    });
};