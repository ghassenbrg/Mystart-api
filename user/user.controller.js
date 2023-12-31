const checkAuth=require('../middleware/check-auth');
module.exports = (app) => {
    const users = require('./user.routes.js');

    // Create a new User
    app.post('/api/user',users.create);

  
  
    
  app.post('/api/user/login',users.login);

    // Retrieve all Users
   
    // Retrieve a single Product with userId
    app.get('/api/user/:userId', users.finduser);
      // Retrieve a single Product with userId
    app.get('/api/users',users.findAll);
    //find admin
    app.get('/api/bannedusers',users.findAllbanned);
    app.get('/api/unbannedusers',users.findAllunbanned);
    app.get('/api/user/:userId',users.finduser);
    // Update user
    app.put('/api/user/:userId',users.update);

    app.put('/api/banuser/:userId',users.ban);
    app.put('/api/unbanuser/:userId',users.unban);
    // Delete a user
    app.delete('/api/user/:userId',users.delete);
    app.get('/api/nombreofuser',users.count);
}