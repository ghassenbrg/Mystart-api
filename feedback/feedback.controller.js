module.exports = (app) => {
    const orders= require('./order.routes.js');

    // Create a new project
    app.post('/api/feedbacks', feedbacks.create);

    // Retrieve all projects
    app.get('/api/feedbacks', feedbacks.findAll);

    // Retrieve a project
    app.get('/api/feedbacks/:feedbackId', orders.findOne);

    // Update project
    app.put('/api/feedbacks/:feedbackId', orders.update);

    // Delete a user
    app.delete('/api/orders/:feedbackId', orders.delete);
}