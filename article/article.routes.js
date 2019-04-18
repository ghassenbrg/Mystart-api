module.exports = (app) => {
    const articles = require('./article.controller.js');

    // Create a new project
    app.post('/api/articles', articles.create);

    // Retrieve all projects
    app.get('/api/articles', articles.findAll);

    // Retrieve a project
    app.get('/api/articles/:articleId', articles.findOne);

    // Update project
    app.put('/api/articles/:articleId', articles.update);

    // Delete a user
    app.delete('/api/articles/:articleId', articles.delete);
}