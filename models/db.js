const mongoose = require('mongoose');
const user=require('../user/user.model')

class db {

  constructor(){  

      mongoose.connect('mongodb://localhost/fundea',{useNewUrlParser: true}).then(() => {
          this.conn=true;
  console.log("Successfully connected to the database");    
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  this.conn=false;
  process.exit();
      });
  }
}

module.exports = new db(); //export an instance of the db