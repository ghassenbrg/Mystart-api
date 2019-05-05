module.exports = (app) => {
    const services = require('./service.routes.js');

    // Create a new service
    app.post('/api/services', services.create);

    // Retrieve all services
    app.get('/api/services', services.findAll);

    // Retrieve a service
    app.get('/api/service/:serviceId', services.findOne);
    //
    app.put('/api/service/:serviceId', services.update);

    // Delete a service
    app.delete('/api/service/:serviceId', services.delete);
}