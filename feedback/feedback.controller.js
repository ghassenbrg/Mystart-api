module.exports = (app) => {
    const feedbacks= require('./feedback.routes.js');

    // Create a new project
    app.post('/api/feedbacks', feedbacks.create);

    // Retrieve all projects
    app.get('/api/feedbacks', feedbacks.findAll);

    // Retrieve a project
    app.get('/api/feedbacks/:feedbackId',  feedbacks.findOne);

    // Update project
    app.put('/api/feedbacks/:feedbackId',  feedbacks.update);

    // Delete a user
    app.delete('/api/feedbacks/:feedbackId',  feedbacks.delete);
}