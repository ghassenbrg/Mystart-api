
const Article = require('./article.model.js');

//Create new user
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "article cannot created"
        });
    }

    // Create a user
    const article = new Article({
        title: req.body.title, 
        description: req.body.description, 
        coverimg:req.body.coverimg, 
        views:req.body.views, 
        visibility:req.body.visibility, 
        authorized:req.body.authorized, 
        categorie:req.body.categorie, 
       
    });

    // Save User in the database
    article.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the article."
        });
    });
};

// Retrieve all users from the database.
exports.findAll = (req,res) => {
    Article.find()
    .then(articles => {
        res.send(articles);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving articles."
        });
    });
};

// Find a single article by id
exports.findOne = (req, res) => {
    Article.findById(req.params.articleId)
    .then(article => {
        if(!article) {
            return res.status(404).send({
                message: "article not found with id " + req.params.articleId
            });            
        }
        res.send(article);
    }).catch(err => {
        if(err.kind === 'articleId') {
            return res.status(404).send({
                message: "article not found with id " + req.params.articleId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving article with id " + req.params.articleId
        });
    });
};

// Update a user
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "article content can not be empty"
        });
    }

    // Find and update user with the request body
    Article.findByIdAndUpdate(req.params.articleId, {
        title: req.body.title, 
        description: req.body.description, 
        coverimg:req.body.coverimg, 
        views:req.body.views, 
        visibility:req.body.visibility, 
        authorized:req.body.authorized, 
        categorie:req.body.categorie, 
    }, {new: true})
    .then(article => {
        if(!article) {
            return res.status(404).send({
                message: "article not found with id " + req.params.articleId
            });
        }
        res.send(article);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "article not found with id " + req.params.articleId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating  " + req.params.articleId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Article.findByIdAndRemove(req.params.articleId)
    .then(article => {
        if(!article) {
            return res.status(404).send({
                message: "article not found with id " + req.params.articleId
            });
        }
        res.send({message: "article deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "article not found with id " + req.params.articleId
            });                
        }
        return res.status(500).send({
            message: "Could not find article with id " + req.params.articleId
        });
    });
};