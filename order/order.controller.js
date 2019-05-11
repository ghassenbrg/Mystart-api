module.exports = (app) => {
    const orders= require('./order.routes.js');

    // Create a new project
    app.post('/api/orders', orders.create);

    // Retrieve all projects
    app.get('/api/orders', orders.findAll);

    // Retrieve a project
    app.get('/api/orders/:orderId', orders.findOne);

    // Update project
    app.put('/api/orders/:orderId', orders.update);

    // Delete a user
    app.delete('/api/orders/:orderId', orders.delete);
}