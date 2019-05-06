const checkAuth=require('../middleware/check-auth');
module.exports = (app) => {
    const admins = require('./admin.routes.js');

    // Create a new User
    app.post('/api/admins',admins.create);

  
  

    app.post('/api/admin/login',admins.login);
    
   
    app.get('/api/admin/:adminId',admins.findadmin);
    // Retrieve a single Product with userId
      // Retrieve a single Product with userId
    
  
    // Update admin
    app.put('/api/admin/:adminId',admins.update);

    // Delete a user

}