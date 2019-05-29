module.exports = (app) => {
    const events = require('./event.routes.js');

    // Create a new project
    app.post('/api/events', events.create);

    // Retrieve all projects
    app.get('/api/events', events.findAll);

    app.get('/api/publishedevents', events.findpublishedevent);
    app.get('/api/unpublishedevents', events.findunpublishedevent);

    app.put('/api/publishevents/:eventId', events.publish);
    app.put('/api/unpublishevents/:eventId', events.unpublish);

    // Retrieve a project
    app.get('/api/events/:eventId', events.findOne);

    app.get('/api/todayevents/',events.findTodayEvents);




    // Update project
    app.put('/api/events/:eventId', events.update);

    // Delete a user
    app.delete('/api/events/:eventId', events.delete);
}