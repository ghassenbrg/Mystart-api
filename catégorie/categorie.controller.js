module.exports = (app) => {
    const categories = require('./categoriee.routes.js');

    // Create a new project
    app.post('/categories', categories.create);

    // Retrieve all projects
    app.get('/categories', categories.findAll);

    // Retrieve a project
    app.get('/categories/:categorieId', categories.findOne);

    // Update project
    app.put('/articles/:categorieId', categories.update);

    // Delete a user
    app.delete('/articles/:categorieId', categories.delete);
}