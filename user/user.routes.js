module.exports = (app) => {
    const users = require('./user.controller.js');

    // Create a new User
    app.post('/users', users.create);



    // Retrieve all Users
    app.get('/experts', users.findAllexpert);
   
    app.get('expert/:userId', users.findexpert);
    // Retrieve a single Product with userId
    app.get('user/:userId', users.finduser);
      // Retrieve a single Product with userId
    app.get('/users',users.findAll);
    //find admin
    app.get('/user/:userId',users.findadmin);
    // Update user
    app.put('/user/:userId', users.update);

    // Delete a user
    app.delete('/user/:userId', users.delete);

}