const Order = require('./order.model.js');

//Create new user
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "order cannot created"
        });
    }

    // Create a user
    const order = new Order({
        offferid:req.body.offferid,
        productType: req.body.productType, 
        cost: req.body.cost, 
        eatu:req.body.orderStatu,
        purchasedate:req.body.purchasedate
       
    });

    // Save User in the database
    order.save()
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
    Order.find().sort({})
    .then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving orders."
        });
    });
};

// Find a single order by id
exports.findOne = (req, res) => {
    Orders.findById(req.params.orderId)
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "order not found with id " + req.params.orderId
            });            
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'orderId') {
            return res.status(404).send({
                message: "order not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving order with id " + req.params.orderId
        });
    });
};

// Update a user
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "order content can not be empty"
        });
    }

    // Find and update user with the request body
    Order.findByIdAndUpdate(req.params.orderId, {
        offferid:req.body.offferid,
        productType: req.body.productType, 
        cost: req.body.cost, 
        orderStatu:req.body.orderStatu,
        purchasedate:req.body.purchasedate

    }, {new: true})
    .then(order => {
        if(!order) {
            return res.status(400).send({
                message: "order not found with id " + req.params.orderId
            });
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "error " + req.params.orderId
            });                
        }
        return res.status(404).send({
            message: "Something wrong updating  " + req.params.orderId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Order.findByIdAndRemove(req.params.orderId)
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "order not found with id " + req.params.orderId
            });
        }
        res.send({message: "order deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "order not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Could not find order with id " + req.params.orderId
        });
    });
};