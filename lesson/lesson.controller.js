module.exports = (app) => {
    const lessons = require('./lesson.routes.js');

    // Create a new project
    app.post('/lessons', lessons.create);

    // Retrieve all projects
    app.get('/lessons', lessons.findAll);

    // Retrieve a project
    app.get('/lessons/:lessonId', lessons.findOne);

    // Update project
    app.put('/lessons/:lessonId', lessons.update);

    // Delete a user
    app.delete('/lessons/:lessonId', lessons.delete);
}