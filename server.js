// get dependencies
const express = require('express');
const bodyParser = require('body-parser');
var swaggerJSDoc = require('swagger-jsdoc');

const app = express();

// Swagger
const docs = require('./swagger.json');
const swaggerUi = require('swagger-ui-express');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(docs));


//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.get('/swagger.json', function(req, res) {   res.setHeader('Content-Type', 'application/json');   res.send(swaggerSpec); });

// Configuring the database
const mongoose = require('mongoose');
require('./user/user.routes.js')(app);
require('./project/project.routes')(app);

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect('mongodb://localhost/fundea',{useNewUrlParser: true}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// default route
app.get('/', (req, res) => {
    res.send({"message": "Welcome to app"});
});

// listen on port 3000
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});