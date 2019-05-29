const User = require('./user.model.js');
const JWT=require('jsonwebtoken');
const bcrypt=require('bcrypt');
//

//Create new user

exports.create = (req, res) => {
    User.find({email:req.body.email})
    .then(user => {
        
    if(user.length>=1)
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
    

    // else Create a user
    const user = new User({ 

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
        isadmin:req.body.isadmin,
       

        
    });
                 user.save().then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: "user created."
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



    
    // Save User in the database
    exports.count = (req,res) => {
        User.find().countDocuments()
        .then(nbr => {
            res.send({nbr: nbr});
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving users."
            });
        });
    };



exports.findAll = (req,res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving userss."
        });
    });
}; 

//login user
exports.login=(req,res) => {
    User.findOne({email:req.body.email}).exec().then(user=> {
        if (user.length<1) {
            return res.status(404).json({
                message: "admin not found " 
            });    
        }
        bcrypt.compare(req.body.mdp,user.mdp,(err, result) => {
          if (err) {
            return res.status(404).json({
                message: "admin not found with id " 
            });    
          }
          if (result) {
            const token = JWT.sign(
              {
                email:user.email,
                userId:user._id
              },
              process.env.JWT_KEY,
              {
                  expiresIn: "24h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token,
              id: user._id
            });
          }
          return res.status(404).json({
            message: "admin not found with id " 
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



//login admin 

// Retrieve all experts banned user from database.!
exports.findAllbanned = (req,res) => {
    User.find({banned: true})
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving banned users."
        });
    });
};
//return all unbanned users

exports.findAllunbanned = (req,res) => {
    User.find({banned: false})
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving unbanned users."
        });
    });
};

/*exports.login = (req, res) => {
    User.find( { $and: [ { username:req.params.username }, { password: req.params.username } ] } )
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "username or mot pass incorrect " + req.params.username
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found  " + req.params.username
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving user with name " + req.params.username
        });
    });
};*/
exports.finduser= (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving user with id " + req.params.userId
        });
    });
};

// Update a user
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    // Find and update user with the request body
    User.findByIdAndUpdate(req.params.userId, {
        username: req.body.nom, 
        password: req.body.pre,
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
        expert:[{netincome:req.body.notincome,withdrawn:req.body.withdrawn,availableforwithdrawal:req.body.withdrawal.availableforwithdrawal}],
        isadmin:req.body.isadmin,
        skills:req.body.skills
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(400).send({
                message: " nothing to update " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.userId
        });
    });
};




exports.ban = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    // Find and update user with the request body
    User.findByIdAndUpdate(req.params.userId, {
       banned:true,
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(400).send({
                message: " nothing to update " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.userId
        });
    });
};

exports.unban = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    // Find and update user with the request body
    User.findByIdAndUpdate(req.params.userId, {
       banned:false,
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(400).send({
                message: " nothing to update " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.userId
        });
    });
};


// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(400).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "error with deleting " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "error " + req.params.userId
        });
    });
};
