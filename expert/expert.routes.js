const Expert = require('./expert.model.js');
const JWT=require('jsonwebtoken');
const bcrypt=require('bcrypt');
//

//Create new expert

exports.create = (req, res) => {
    Expert.find({email:req.body.email})
    .then(expert => {
        
    if(expert.length>=1)
    {
    
        return res.status(401).json({
            message: "failed"
          });
        }
        else
        {
    bcrypt.hash(req.body.mdp,10,(err,hash)=>
    {
        if (err)
       { return res.status(401).json({
        message: "failed"
      });
        }
        
else
 {
    

    // else Create a expert
    const expert = new Expert({ 

        username: req.body.nom, 
        mdp:hash,
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
        netincome:req.body.netincome,
        withdrawn:req.body.withdrawan,
        availableforwithdrawal:req.body.availableforwithdrawal,
        skills:req.body.skills,
        verified:req.body.verified

        
    });
                 expert.save().then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: "expert created."
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(500).json({
                       error:err
                    });
                });
            }
        });
    }
    });
} 



    
    // Save expert in the database
    



exports.findAll = (req,res) => {
    Expert.find()
    .then(experts => {
        res.send(experts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving experts."
        });
    });
}; 

//login expert
exports.login=(req,res) => {
    Expert.findOne({email:req.body.email}).exec().then(expert=> {
        if (expert.length<1) {
            return res.status(404).json({
                message: "expert not found " 
            });    
        }
        bcrypt.compare(req.body.mdp,expert.mdp,(err, result) => {
          if (err) {
            return res.status(404).json({
                message: "expert not found with id " 
            });    
          }
          if (result) {
            const token = JWT.sign(
              {
                email:expert.email,
                expertId:expert._id
              },
              process.env.JWT_KEY,
              {
                  expiresIn: "24h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token,
              id: expert._id
            });
          }
          return res.status(404).json({
            message: "expert not found with id " 
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };




// Retrieve all experts from the database.!
exports.findAllexpert = (req,res) => {
    Expert.find()
    .then(experts => {
        res.send(experts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving experts."
        });
    });
};

exports.findVerifiedexpert = (req,res) => {
    Expert.find({verified: true})
    .then(experts => {
        res.send(experts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving experts."
        });
    });
};
exports.findUnverifiedexpert = (req,res) => {
    Expert.find({verified: false})
    .then(experts => {
        res.send(experts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving experts."
        });
    });
};
exports.findBannedexpert = (req,res) => {
    Expert.find({banned: true})
    .then(experts => {
        res.send(experts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving experts."
        });
    });
};

exports.findUnbannedexpert = (req,res) => {
    Expert.find({banned: false})
    .then(experts => {
        res.send(experts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving experts."
        });
    });
};



exports.findexpert= (req, res) => {
    Expert.findById(req.params.expertId)
    .then(expert => {
        if(!expert) {
            return res.status(404).send({
                message: "expert not found with id " + req.params.expertId
            });            
        }
        res.send(expert);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "expert not found with id " + req.params.expertId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving expert with id " + req.params.expertId
        });
    });
};

// Update a expert
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "expert content can not be empty"
        });
    }

    // Find and update expert with the request body
    Expert.findByIdAndUpdate(req.params.expertId, {
        username: req.body.nom, 
        mdp:hash,
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
        netincome:req.body.netincome,
        withdrawn:req.body.withdrawan,
        availableforwithdrawal:req.body.availableforwithdrawal,
        skills:req.body.skills,
        verified:req.body.verified

     
    }, {new: true})
    .then(expert => {
        if(!expert) {
            return res.status(400).send({
                message: " nothing to update " + req.params.expertId
            });
        }
        res.send(expert);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "expert not found with id " + req.params.expertId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.expertId
        });
    });
};


exports.verify = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "expert content can not be empty"
        });
    }

    // Find and update expert with the request body
    Expert.findByIdAndUpdate(req.params.expertId, {
       verified:true,
       banned:false

     
    }, {new: true})
    .then(expert => {
        if(!expert) {
            return res.status(400).send({
                message: " nothing to update " + req.params.expertId
            });
        }
        res.send(expert);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "expert not found with id " + req.params.expertId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.expertId
        });
    });
};

exports.count = (req,res) => {
    Expert.find().countDocuments()
    .then(nbr => {
        res.send({nbr: nbr});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving users."
        });
    });
};


exports.ban = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "expert content can not be empty"
        });
    }

    // Find and update expert with the request body
    Expert.findByIdAndUpdate(req.params.expertId, {
      banned:true,

     
    }, {new: true})
    .then(expert => {
        if(!expert) {
            return res.status(400).send({
                message: " nothing to update " + req.params.expertId
            });
        }
        res.send(expert);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "expert not found with id " + req.params.expertId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.expertId
        });
    });
};


exports.unban = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "expert content can not be empty"
        });
    }

    // Find and update expert with the request body
    Expert.findByIdAndUpdate(req.params.expertId, {
      banned:false,

     
    }, {new: true})
    .then(expert => {
        if(!expert) {
            return res.status(400).send({
                message: " nothing to update " + req.params.expertId
            });
        }
        res.send(expert);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "expert not found with id " + req.params.expertId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.expertId
        });
    });
};
// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Expert.findByIdAndRemove(req.params.expertId)
    .then(expert => {
        if(!expert) {
            return res.status(400).send({
                message: "expert not found with id " + req.params.expertId
            });
        }
        res.send({message: "expert deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "error with deleting " + req.params.expertId
            });                
        }
        return res.status(500).send({
            message: "error " + req.params.expertId
        });
    });
};
