module.exports = (app) => {
    const courses = require('./course.routes.js');

    // Create a new project
    app.post('/courses', courses.create);

    // Retrieve all projects
    app.get('/courses', courses.findAll);

    // Retrieve a project
    app.get('/course/:courseId', courses.findOne);

    // Update project
    app.put('/courses/:courseId', lessons.update);

    // Delete a user
    app.delete('/courses/:lessonId', lessons.delete);
}