module.exports = (app) => {
    const articles = require('./article.controller.js');

    // Create a new project
    app.post('/api/items', items.create);

    // Retrieve all projects
    app.get('/api/items', items.findAll);

    // Retrieve a project
    app.get('/api/items/:itemId', items.findOne);

    // Update project
    app.put('/api/items/:itemId', items.update);

    // Delete a user
    app.delete('/api/items/:itemId', items.delete);
}