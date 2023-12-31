module.exports = (app) => {
    const articles = require('./article.routes.js');

    // Create a new project
    app.post('/api/articles', articles.create);

    // Retrieve all projects
    app.get('/api/articles', articles.findAll);
    app.get('/api/articles_verified', articles.findverified);
    app.get('/api/articles_unverified', articles.findunverified);
    // Retrieve a project
    app.get('/api/articles/:articleId', articles.findOne);

    // Update project
    app.put('/api/articles/:articleId', articles.update);


    app.put('/api/updatearticles/:articleId', articles.updatearticle);

    // Delete a user
    app.delete('/api/articles/:articleId', articles.delete);
}