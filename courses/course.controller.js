module.exports = (app) => {
    const courses = require('./course.routes.js');

    // Create a new project
    app.post('/api/courses', courses.create);

    // Retrieve all projects
    app.get('/api/courses', courses.findAll);

    // Retrieve a project
    app.get('/api/courses/:courseId', courses.findOne);

    // Update project
    app.put('/api/courses/:courseId', courses.update);

    app.put('/api/verifycourses/:courseId', courses.verify);
    
    // Delete a user
    app.delete('/api/courses/:courseId', courses.delete);
}