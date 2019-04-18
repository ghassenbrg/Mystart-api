module.exports = (app) => {
    const articles = require('./order.controller.js');

    // Create a new order
    app.post('/api/orders', orders.create);

    // Retrieve all orders
    app.get('/api/getorders', orders.findAll);

    // Retrieve a order
    app.get('/api/orders/:orderId', orders.findOne);

    // Delete a order
    app.delete('/api/orders/:orderId', orders.delete);
}