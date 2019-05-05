const Admin = require('./admin.model.js');
const JWT=require('jsonwebtoken');
const bcrypt=require('bcrypt');
//login admin
exports.create = (req, res) => {
  Admin.find({email:req.body.email})
  .then(admin => {
      
  if(admin.length>=1)
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
  

  // else Create a admin
  const admin = new Admin({ 

      adminname: req.body.nom, 
      mdp:hash,
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      email:req.body.email,
      
     

      
  });
  admin.save().then(result => {
                  console.log(result);
                  res.status(201).json({
                      message: "admin created."
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

exports.login=(req,res) => {
   Admin.findOne({email:req.body.email}).exec().then(admin=> {
        if (admin.length<1) {
            return res.status(404).json({
                message: "admin not found " 
            });    
        }
        bcrypt.compare(req.body.mdp,admin.mdp,(err, result) => {
          if (err) {
            return res.status(404).json({
                message: "admin not found with id " 
            });    
          }
          if (result) {
            const token = JWT.sign(
              {
                email:admin.email,
                adminId:admin._id
              },
              process.env.JWT_KEY,
              {
                  expiresIn: "24h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token,
              id: admin._id
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

  exports.findAlladmin = (req,res) => {
    Admin.find()
    .then(admins => {
        res.send(admins);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving userss."
        });
    });
}; 



  exports.findadmin= (req, res) => {
    Admin.findById(req.params.adminId)
    .then(admin => {
        if(!admin) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.adminId
            });            
        }
        res.send(admin);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.adminId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving admin with id " + req.params.adminId
        });
    });
};



// Update a admin
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "admin content can not be empty"
        });
    }

    // Find and update admin with the request body
    Admin.findByIdAndUpdate(req.params.adminId, {
        admin_name: req.body.nom, 
        lastname:req.body.lastname,
        email: req.body.email,
        profilpic:req.body.profilpic,
        sexe: req.body.sexe,
       
     
    }, {new: true})
    .then(admin => {
        if(!admin) {
            return res.status(400).send({
                message: " nothing to update " + req.params.adminId
            });
        }
        res.send(admin);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.adminId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.adminId
        });
    });
};

// Delete a note with the specified noteId in the request

