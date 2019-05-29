module.exports = (app) => {
    const projects = require('./project.routes.js');

    // Create a new project
    app.post('/api/project', projects.create);

    // Retrieve all projects
    app.get('/api/project', projects.findAll);

    // Retrieve a project
    app.get('/api/project/:projectId', projects.findOne);
    app.get('/api/verifiedprojects', projects.verifiedprojects);
    app.get('/api/unverifiedprojects', projects.unverifiedprojects);
    // Update project
    app.put('/api/project/:projectId', projects.update);

    app.put('/api/verifyproject/:projectId', projects.verify);

    // Delete a user
    app.delete('/api/project/:projectId', projects.delete);
}