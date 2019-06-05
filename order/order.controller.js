module.exports = (app) => {
    const orders= require('./order.routes.js');

    // Create a new project
    app.post('/api/orders', orders.create);

    // Retrieve all projects
    app.get('/api/orders', orders.findAll);
    app.get('/api/completedorders', orders.completedorders);
    app.get('/api/incompletedorders', orders.incompletedorders);

    // Retrieve a project
    app.get('/api/orders/:orderId', orders.findOne);
    app.get('/api/orders-somme',orders.somme);
    app.get('/api/orders-profits-today',orders.todayprofit);
  
    
    // Update project
    app.put('/api/orders/:orderId', orders.update);
    app.put('/api/completeorders/:orderId', orders.complete);

    // Delete a user
    app.delete('/api/orders/:orderId', orders.delete);
}