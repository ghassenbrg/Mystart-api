module.exports = (app) => {
    const articles = require('./lesson.controller.js');

    // Create a new project
    app.post('/api/lessons', lessons.create);

    // Retrieve all projects
    app.get('/api/lessons', lessons.findAll);

    // Retrieve a project
    app.get('/api/lessons/:lessonId', lessons.findOne);

    // Update project
    app.put('/api/events/:eventId', lessons.update);

    // Delete a user
    app.delete('/api/events/:eventId', events.delete);
}