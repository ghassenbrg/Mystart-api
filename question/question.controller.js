module.exports = (app) => {
    const questions = require('./question.routes.js');

    // Create a new project
    app.post('/questions', questions.create);

    // Retrieve all projects
    app.get('/questions', questions.findAll);

    // Retrieve a project
    app.get('/questions/:questionId', questions.findOne);

    // Update project
    app.put('/questions/:questionId', questions.update);

    // Delete a user
    app.delete('/questions/:questionId',questions.delete);
}