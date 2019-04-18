module.exports = (app) => {
    const projects = require('./project.controller.js');

    // Create a new project
    app.post('/api/projects', projects.create);

    // Retrieve all projects
    app.get('/api/projects', projects.findAll);

    // Retrieve a project
    app.get('/api/projects/:projectId', projects.findOne);

    // Update project
    app.put('/api/projects/:projectId', projects.update);

    // Delete a user
    app.delete('/api/projects/:projectId', projects.delete);
}