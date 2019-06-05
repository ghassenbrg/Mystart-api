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
      
        
        productType: req.body.productType, 
        cost: req.body.cost, 
        orderStatu:req.body.orderStatu,
        complete:req.body.complete,
        expert:req.body.expertId,
        user:req.body.userId,
       
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
    Order.find()
    .then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving orders."
        });
    });
};
exports.completedorders = (req,res) => {
    Order.find({orderStatu:true})
    .then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving orders."
        });
    });
};
exports.incompletedorders = (req,res) => {
    Order.find({orderStatu:false})
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
    Order.findById(req.params.orderId)
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
        productType: req.body.productType, 
        cost: req.body.cost, 
        orderStatu:req.body.orderStatu,
        complete:req.body.complete,
        expert:req.body.expertId,
        user:req.body.userId,
    }, {new: true})
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "order not found with id " + req.params.orderId
            });
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "order not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating  " + req.params.orderId
        });
    });
};

exports.somme = (req,res) => {
    Order.aggregate([ { $match: {orderStatu:true} },
        { $group: {_id: 'youcef',  //$region is the column name in collection
               sum: {$sum: '$cost'}
            }
        }
    ], function (err, result) {
        if (err) {
            next(err);
        } else {
            res.send(result);
        }
    });
}

exports.todayprofit = (req,res) => {
    Order.aggregate([ { $match: {$and:[{orderStatu:true},{updatedAt: { 
        $lt: new Date(), 
        $gte: new Date(new Date().setDate(new Date().getDate()-1))
      }   }] } },
        { $group: {_id: 'youcef',  //$region is the column name in collection
               sum: {$sum: '$cost'}
            }
        }
    ], function (err, result) {
        if (err) {
            next(err);
        } else {
            res.send(result);
        }
    });
}


exports.complete = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "order content can not be empty"
        });
    }

    // Find and update user with the request body
    Order.findByIdAndUpdate(req.params.orderId, {
     
        orderStatu:true,
        
    }, {new: true})
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "order not found with id " + req.params.orderId
            });
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "order not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
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




