module.exports = (app) => {
    const articles = require('./event.controller.js');

    // Create a new project
    app.post('/api/events', events.create);

    // Retrieve all projects
    app.get('/api/events', events.findAll);

    // Retrieve a project
    app.get('/api/events/:eventId', events.findOne);

    // Update project
    app.put('/api/events/:eventId', events.update);

    // Delete a user
    app.delete('/api/events/:eventId', events.delete);
}