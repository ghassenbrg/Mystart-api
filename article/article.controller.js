module.exports = (app) => {
    const articles = require('./article.routes.js');

    // Create a new project
    app.post('/articles', articles.create);

    // Retrieve all projects
    app.get('/articles', articles.findAll);

    // Retrieve a project
    app.get('/articles/:articleId', articles.findOne);

    // Update project
    app.put('/articles/:articleId', articles.update);

    // Delete a user
    app.delete('/articles/:articleId', articles.delete);
}