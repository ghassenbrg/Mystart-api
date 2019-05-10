const checkAuth=require('../middleware/check-auth');
module.exports = (app) => {
    const experts = require('./expert.routes.js');

    // Create a new User
    app.post('/api/experts',experts.create);

  
  
  app.post('/api/expert/login',experts.login);

    // Retrieve all Users
    app.get('/api/experts',experts.findAllexpert);
   
    app.get('/api/expert/:Id', experts.findexpert);
    // Retrieve a single Product with userId
      // Retrieve a single Product with userId
    
  
    // Update expert
    app.put('/api/expert/:expertId',experts.update);
  

    // Delete an expert 
    app.delete('/api/expert/:expertId',experts.delete);
}