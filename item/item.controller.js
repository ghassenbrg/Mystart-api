module.exports = (app) => {
    const items = require('./item.routes.js');

    // Create a new project
    app.post('/items', items.create);

    // Retrieve all projects
    app.get('/items', items.findAll);

    // Retrieve a project
    app.get('/items/:itemId', items.findOne);

    // Update project
    app.put('/items/:itemId', items.update);

    // Delete a user
    app.delete('/items/:itemId', items.delete);
}