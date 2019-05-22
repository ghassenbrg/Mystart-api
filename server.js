// get dependencies
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
var nodemailer=require('nodemailer');
const ejs = require("ejs");
require('dotenv').config();
const app = express();

// parse requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var urlencodedParser=bodyParser.urlencoded({extended:false});
var moment = require('moment')
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
require('./user/user.controller.js')(app);
require('./project/project.controller.js')(app);
require('./service/service.controller.js')(app);
require('./lesson/lesson.controller.js')(app);
require('./item/item.controller.js')(app);
require('./article/article.controller.js')(app);
require('./event/event.controller.js')(app);
require('./question/question.controller.js')(app);
require('./admin/admin.controller.js')(app);
require('./expert/expert.controller.js')(app);
require('./courses/course.controller.js')(app);
require('./order/order.controller.js')(app);
require('./configdata/config.controller.js')(app);
mongoose.Promise = global.Promise;

// Connecting to the database

    mongoose.set('useCreateIndex', true);
    mongoose.connect('mongodb://localhost/fundea',{useNewUrlParser: true}).then(() => {
      
console.log("Successfully connected to the database");    
}).catch(err => {
console.log('Could not connect to the database. Exiting now...', err);

process.exit();
    });
    app.use( express.static( "public" ) );

    app.set('view engine', 'ejs');
// default route
/*app.get('/editable_table', (req, res) => {
    res.render('editable_table',{name:user:});
});*/

app.post('/editEventpage', (req, res) => {
    request.get({ url: "http://localhost:3000/api/events/"+req.body.id},function(error, response,body) {
        if (!error && response.statusCode == 200) { myData2 = JSON.parse(body);
    request.get({ url: "http://localhost:3000/api/admin/5ccc2c59ea929d23bc7ff1a9" },function(error, response, body) {
        if (!error && response.statusCode == 200) {
            myData = JSON.parse(body);
            res.render('editevent',{data: myData,moment:moment,data2:myData2});
           }
        
       })}})});


       app.post('/editEvent', (req, res) => {
           request.put({ url: "http://localhost:3000/api/events/"+req.body.id, form: req.body },function(error, response) {
        if (!error && response.statusCode == 200) {
       request.get({ url: "http://localhost:3000/api/admin/5ccc2c59ea929d23bc7ff1a9" },function(error, response, body) {
                if (!error && response.statusCode == 200) {
                  
                    myData2 = JSON.parse(body);
                    request.get({ url: "http://localhost:3000/api/events" },function(error, response, body) {
                        if (!error && response.statusCode == 200) {
                            myData = JSON.parse(body);
                            res.render('events',{data: myData,data2:myData2,moment:moment});
                           }      }); }});}})
                        });
                       
                 



app.get('/events', (req, res) => {
    request.get({ url: "http://localhost:3000/api/admin/5ccc2c59ea929d23bc7ff1a9" },function(error, response, body) {
        if (!error && response.statusCode == 200) {
          
            myData2 = JSON.parse(body);
            request.get({ url: "http://localhost:3000/api/events" },function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    myData = JSON.parse(body);
                    res.render('events',{data: myData,data2:myData2,moment:moment});
                   }
               });
        }});
           
        
       })


app.get('/addEvent', (req, res) => {
    request.get({ url: "http://localhost:3000/api/admin/5ccc2c59ea929d23bc7ff1a9" },function(error, response, body) {
        if (!error && response.statusCode == 200) {
            //res.render('index',{data: body});
            myData = JSON.parse(body);
            res.render('addEvent',{data: myData,moment:moment});
           }
       });




       
    
    
});

app.post('/deleteEvent',urlencodedParser, function(req, res) { 
                                                    
    request.delete({ url: "http://localhost:3000/api/events/"+req.body.id},function(error, response) {
        if (!error && response.statusCode == 200) {
           
            request.get({ url: "http://localhost:3000/api/admin/"+myAdmin.id},function(error, response, body) {
if (!error && response.statusCode == 200) {
    myData2 = JSON.parse(body);
   }});
request.get({ url: "http://localhost:3000/api/events" },function(error, response, body) {
if (!error && response.statusCode == 200) {
    myData = JSON.parse(body);
    res.render('events',{data: myData,data2:myData2,moment:moment});
   }

});
}
}); });



app.post('/publishevent',urlencodedParser, function(req, res) { 
                                        
    request.put({ url: "http://localhost:3000/api/publishevents/"+req.body.id},function(error, response) {
        if (!error && response.statusCode == 200) {
           
            request.get({ url: "http://localhost:3000/api/admin/"+myAdmin.id},function(error, response, body) {
if (!error && response.statusCode == 200) {
    myData2 = JSON.parse(body);
   }});
request.get({ url: "http://localhost:3000/api/events" },function(error, response, body) {
if (!error && response.statusCode == 200) {
    myData = JSON.parse(body);
    res.render('events',{data: myData,data2:myData2,moment:moment});
   }
});
           }
        }); });

        app.post('/unpublishevent',urlencodedParser, function(req, res) { 
                                        
            request.put({ url: "http://localhost:3000/api/unpublishevents/"+req.body.id},function(error, response) {
                if (!error && response.statusCode == 200) {
                   
                    request.get({ url: "http://localhost:3000/api/admin/"+myAdmin.id},function(error, response, body) {
        if (!error && response.statusCode == 200) {
            myData2 = JSON.parse(body);
           }});
        request.get({ url: "http://localhost:3000/api/events" },function(error, response, body) {
        if (!error && response.statusCode == 200) {
            myData = JSON.parse(body);
            res.render('events',{data: myData,data2:myData2,moment:moment});
           }
        });
                   }
                }); });
        




app.post('/addEvent',function(req, res) {
   
           request.post({ url: "http://localhost:3000/api/events",form: req.body },function(error, response, body) {
            if (!error && response.statusCode == 200) {
                myData = JSON.parse(body);
                request.get({ url: "http://localhost:3000/api/admin/5ccc2c59ea929d23bc7ff1a9"},function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        myData2 = JSON.parse(body);
                        res.render('addEvent',{data: myData2,moment:moment});
                       }
                       else {
                    res.render(myData2);}
                   });
               }
            else {console.log(req.body)}
            }); });
       
       
    
    











app.post('/configdata', function(req, res) {
    request.put({ url: "http://localhost:3000/api/configs/5cdb72e5f27e2517a44e274a", form: req.body },function(error, response, body) {
            if (!error && response.statusCode == 200) {
                myData = JSON.parse(body);
                request.get({ url: "http://localhost:3000/api/admin/5ccc2c59ea929d23bc7ff1a9"},function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        myData2 = JSON.parse(body);
                        request.get({ url: "http://localhost:3000/api/config" },function(error, response, body) {
                            if (!error && response.statusCode == 200) {
                                myData = JSON.parse(body);
                               }
                           });
                        res.render('configdata',{data2:myData2,data: myData});
                       }
                       else {
                    res.render(myData2);}
                   });
               }}); });








               app.get('/feedback', (req, res) => {
                request.get({ url: "http://localhost:3000/api/admin/5ccc2c59ea929d23bc7ff1a9" },function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                       
                        myData = JSON.parse(body);
                        res.render('feedback',{data: myData});
                       }
                   });
                   
                
                
            });




app.get('/index', (req, res) => {
    request.get({ url: "http://localhost:3000/api/admin/5ccc2c59ea929d23bc7ff1a9" },function(error, response, body) {
        if (!error && response.statusCode == 200) {
            myData = JSON.parse(body); }});
            request.get({ url: "http://localhost:3000/api/todayevents" },function(error, response, body) { 
                if (!error && response.statusCode == 200) {  myData2 = JSON.parse(body);
            res.render('index',{data: myData,data2:myData2,moment:moment});
           }
       })});
     



app.get('/account-setting', (req, res) => {
  
            res.render('account-setting',);
           }
    
       
    
    
);


//ban user
app.post('/unbanuser',urlencodedParser, function(req, res) { 
                                                    
    request.put({ url: "http://localhost:3000/api/unbanuser/"+req.body.id},function(error, response) {
        if (!error && response.statusCode == 200) {
           
            request.get({ url: "http://localhost:3000/api/admin/"+myAdmin.id},function(error, response, body) {
if (!error && response.statusCode == 200) {
    myData2 = JSON.parse(body);
   }});
request.get({ url: "http://localhost:3000/api/users" },function(error, response, body) {
if (!error && response.statusCode == 200) {
    myData = JSON.parse(body);
    res.render('editable_table',{data: myData,data2:myData2});
   }
});
           }
        }); });

        app.post('/banuser',urlencodedParser, function(req, res) { 
                                        
            request.put({ url: "http://localhost:3000/api/banuser/"+req.body.id},function(error, response) {
                if (!error && response.statusCode == 200) {
                   
                    request.get({ url: "http://localhost:3000/api/admin/"+myAdmin.id},function(error, response, body) {
        if (!error && response.statusCode == 200) {
            myData2 = JSON.parse(body);
           }});
    request.get({ url: "http://localhost:3000/api/users" },function(error, response, body) {
        if (!error && response.statusCode == 200) {
            myData = JSON.parse(body);
            res.render('editable_table',{data: myData,data2:myData2});
           }
       });
                   }
                }); });





app.get('/projects', urlencodedParser,(req,res)=>{
    request.get({ url: "http://localhost:3000/api/admin/"+myAdmin.id},function(error, response, body) {
        if (!error && response.statusCode == 200) {
            myData2 = JSON.parse(body);
           }});
    request.get({ url: "http://localhost:3000/api/project" },function(error, response, body) {
        if (!error && response.statusCode == 200) {
            myData = JSON.parse(body);
            res.render('projects',{data: myData,data2:myData2});
           }
       });
});


app.post('/projects',urlencodedParser, function(req, res) { 
                                                    
    request.delete({ url: "http://localhost:3000/api/project/"+req.body.id},function(error, response) {
        if (!error && response.statusCode == 200) {
           
            request.get({ url: "http://localhost:3000/api/admin/"+myAdmin.id},function(error, response, body) {
if (!error && response.statusCode == 200) {
    myData2 = JSON.parse(body);
   }});
request.get({ url: "http://localhost:3000/api/project" },function(error, response, body) {
if (!error && response.statusCode == 200) {
    myData = JSON.parse(body);
    res.render('projects',{data: myData,data2:myData2});
   }

});
}
}); });



app.post('/verifyproject',urlencodedParser, function(req, res) { 
                                                    
    request.put({ url: "http://localhost:3000/api/verifyproject/"+req.body.id},function(error, response) {
        if (!error && response.statusCode == 200) {
           
            request.get({ url: "http://localhost:3000/api/admin/"+myAdmin.id},function(error, response, body) {
if (!error && response.statusCode == 200) {
    myData2 = JSON.parse(body);
   }});
request.get({ url: "http://localhost:3000/api/project" },function(error, response, body) {
if (!error && response.statusCode == 200) {
    myData = JSON.parse(body);
    res.render('projects',{data: myData,data2:myData2});
   }

});
}
}); });


app.get('/editable_table', urlencodedParser,(req,res)=>{
    request.get({ url: "http://localhost:3000/api/admin/"+myAdmin.id},function(error, response, body) {
        if (!error && response.statusCode == 200) {
            myData2 = JSON.parse(body);
           }});
    request.get({ url: "http://localhost:3000/api/users" },function(error, response, body) {
        if (!error && response.statusCode == 200) {
            myData = JSON.parse(body);
            res.render('editable_table',{data: myData,data2:myData2});
           }
       });
});




//get experts
app.get('/experts-table', urlencodedParser,(req,res)=>{
    request.get({ url: "http://localhost:3000/api/admin/"+myAdmin.id},function(error, response, body) {
        if (!error && response.statusCode == 200) {
            myData2 = JSON.parse(body);
           }});
    request.get({ url: "http://localhost:3000/api/experts" },function(error, response, body) {
        if (!error && response.statusCode == 200) {
            myData = JSON.parse(body);
            res.render('experts-table',{data: myData,data2:myData2});
           }
       });
});


app.get('/courses', urlencodedParser,(req,res)=>{
    request.get({ url: "http://localhost:3000/api/admin/"+myAdmin.id},function(error, response, body) {
        if (!error && response.statusCode == 200) {
            myData2 = JSON.parse(body);
           }});
    request.get({ url: "http://localhost:3000/api/courses" },function(error, response, body) {
        if (!error && response.statusCode == 200) {
            myData = JSON.parse(body);
            res.render('courses',{data: myData,data2:myData2});
           }
       });
});

app.get('/articles', urlencodedParser,(req,res)=>{
    request.get({ url: "http://localhost:3000/api/admin/"+myAdmin.id},function(error, response, body) {
        if (!error && response.statusCode == 200) {
            myData2 = JSON.parse(body);
           }});
    request.get({ url: "http://localhost:3000/api/articles" },function(error, response, body) {
        if (!error && response.statusCode == 200) {
            myData = JSON.parse(body);
            res.render('articles',{data: myData,data2:myData2});
           }
       });
});


app.get('/orders', urlencodedParser,(req,res)=>{
    request.get({ url: "http://localhost:3000/api/admin/"+myAdmin.id},function(error, response, body) {
        if (!error && response.statusCode == 200) {
            myData2 = JSON.parse(body);
           }});
    request.get({ url: "http://localhost:3000/api/orders" },function(error, response, body) {
        if (!error && response.statusCode == 200) {
           myData = JSON.parse(body);
           } });
           
           request.get({ url: "http://localhost:3000/api/users" },function(error, response, body) {
            if (!error && response.statusCode == 200) {
               myData4 = JSON.parse(body);
               } });


            request.get({url:"http://localhost:3000/api/experts"},function(error,response,body){
            if (!error && response.statusCode == 200) {
          myData3=JSON.parse(body);
          
            res.render('orders',{data: myData,data2:myData2,data3:myData3,userData:myData4});
           }
       });
});

app.post('/orders', urlencodedParser,(req,res)=>{
 
                                                    
        request.delete({ url: "http://localhost:3000/api/orders/"+req.body.id},function(error, response, body) {
            if (!error && response.statusCode == 200) {
                request.get({ url: "http://localhost:3000/api/admin/"+myAdmin.id},function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        myData2 = JSON.parse(body);
                       }});
                       request.get({ url: "http://localhost:3000/api/orders" },function(error, response, body) {
                        if (!error && response.statusCode == 200) {
                           myData = JSON.parse(body);
                           } });
                           
                           request.get({ url: "http://localhost:3000/api/users" },function(error, response, body) {
                            if (!error && response.statusCode == 200) {
                               myData4 = JSON.parse(body);
                               } });
                
                
                            request.get({url:"http://localhost:3000/api/experts"},function(error,response,body){
                            if (!error && response.statusCode == 200) {
                          myData3=JSON.parse(body);
                          
                            res.render('orders',{data: myData,data2:myData2,data3:myData3,userData:myData4});
                        }
                    });
                }})});
    




    app.post('/verify',urlencodedParser, function(req, res) { 
                                                    
        request.put({ url: "http://localhost:3000/api/verifyexpert/"+req.body.id},function(error, response) {
            if (!error && response.statusCode == 200) {
               
                request.get({ url: "http://localhost:3000/api/admin/"+myAdmin.id},function(error, response, body) {
    if (!error && response.statusCode == 200) {
        myData2 = JSON.parse(body);
       }});
request.get({ url: "http://localhost:3000/api/experts" },function(error, response, body) {
    if (!error && response.statusCode == 200) {
        myData = JSON.parse(body);
        res.render('experts-table',{data: myData,data2:myData2});
       }
   });
               }
            }); });
            app.post('/unban',urlencodedParser, function(req, res) { 
                                                    
                request.put({ url: "http://localhost:3000/api/unbanexpert/"+req.body.id},function(error, response) {
                    if (!error && response.statusCode == 200) {
                       
                        request.get({ url: "http://localhost:3000/api/admin/"+myAdmin.id},function(error, response, body) {
            if (!error && response.statusCode == 200) {
                myData2 = JSON.parse(body);
               }});
        request.get({ url: "http://localhost:3000/api/experts" },function(error, response, body) {
            if (!error && response.statusCode == 200) {
                myData = JSON.parse(body);
                res.render('experts-table',{data: myData,data2:myData2});
               }
           });
                       }
                    }); });
        
                    app.post('/ban',urlencodedParser, function(req, res) { 
                                                    
                        request.put({ url: "http://localhost:3000/api/banexpert/"+req.body.id},function(error, response) {
                            if (!error && response.statusCode == 200) {
                               
                                request.get({ url: "http://localhost:3000/api/admin/"+myAdmin.id},function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        myData2 = JSON.parse(body);
                       }});
                request.get({ url: "http://localhost:3000/api/experts" },function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        myData = JSON.parse(body);
                        res.render('experts-table',{data: myData,data2:myData2});
                       }
                   });
                               }
                            }); });


app.get('/',(req,res)=>{
    res.render('login');
});

app.get('/logout',(req,res)=>{
    myAdmin=null;
    res.render('login');
});



app.post('/', function(req, res) {
    request.post({ url: "http://localhost:3000/api/admin/login", form: req.body },function(error, response, body) {
            if (!error && response.statusCode == 200) {
                global.myAdmin = JSON.parse(body);
                request.get({ url: "http://localhost:3000/api/admin/"+myAdmin.id},function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        myData = JSON.parse(body);

                        request.get({ url: "http://localhost:3000/api/todayevents" },function(error, response, body) { 
                            if (!error && response.statusCode == 200) {  myData2 = JSON.parse(body);

                        res.render('index',{data:myData,data2:myData2,moment:moment});}});
                       
                      
                   }});
               }
        
           });
   });




   
   app.post('/account-setting', function(req, res) {
    request.put({ url: "http://localhost:3000/api/admin/"+myAdmin.id, form: req.body },function(error, response, body) {
            if (!error && response.statusCode == 200) {
                myData = JSON.parse(body);
                request.get({ url: "http://localhost:3000/api/admin/"+myAdmin.id},function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        myData = JSON.parse(body);

                        request.get({ url: "http://localhost:3000/api/todayevents" },function(error, response, body) { 
                            if (!error && response.statusCode == 200) {  myData2 = JSON.parse(body);

                        res.render('index',{data:myData,data2:myData2,moment:moment});}});
                   }});
               }}); });
   


   app.post('/editable_table',urlencodedParser, function(req, res) { 
                                                    
    request.delete({ url: "http://localhost:3000/api/user/"+req.body.id},function(error, response, body) {
        if (!error && response.statusCode == 200) {
            request.get({ url: "http://localhost:3000/api/admin/"+myAdmin.id},function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    myData2 = JSON.parse(body);
                   }});
            request.get({ url: "http://localhost:3000/api/users" },function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    myData = JSON.parse(body);
                    res.render('editable_table',{data: myData,data2:myData2});
                   }
               });
           }
        }); });


        app.post('/courses',urlencodedParser, function(req, res) { 
                                                    
            request.delete({ url: "http://localhost:3000/api/courses/"+req.body.id},function(error, response) {
                if (!error && response.statusCode == 200) {
                   
                    request.get({ url: "http://localhost:3000/api/admin/"+myAdmin.id},function(error, response, body) {
        if (!error && response.statusCode == 200) {
            myData2 = JSON.parse(body);
           }});
    request.get({ url: "http://localhost:3000/api/courses" },function(error, response, body) {
        if (!error && response.statusCode == 200) {
            myData = JSON.parse(body);
            res.render('courses',{data: myData,data2:myData2});
           }
       });
                   }
                }); });


                app.post('/verifyarticle',urlencodedParser, function(req, res) { 
                                                    
                    request.put({ url: "http://localhost:3000/api/updatearticles/"+req.body.id},function(error, response) {
                        if (!error && response.statusCode == 200) {
                           
                            request.get({ url: "http://localhost:3000/api/admin/"+myAdmin.id},function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    myData2 = JSON.parse(body);
                   }});
            request.get({ url: "http://localhost:3000/api/articles" },function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    myData = JSON.parse(body);
                    res.render('articles',{data: myData,data2:myData2});
                   }
               });
                           }
                        }); });


                        //verify course 

                        app.post('/verifycourse',urlencodedParser, function(req, res) { 
                                                    
                            request.put({ url: "http://localhost:3000/api/verifycourses/"+req.body.id},function(error, response) {
                                if (!error && response.statusCode == 200) {
                                   
                                    request.get({ url: "http://localhost:3000/api/admin/"+myAdmin.id},function(error, response, body) {
                        if (!error && response.statusCode == 200) {
                            myData2 = JSON.parse(body);
                           }});
                    request.get({ url: "http://localhost:3000/api/courses" },function(error, response, body) {
                        if (!error && response.statusCode == 200) {
                            myData = JSON.parse(body);
                            res.render('courses',{data: myData,data2:myData2});
                           }
                       });
                                   }
                                }); });


                        app.post('/experts-table',urlencodedParser, function(req, res) { 
                                                    
                            request.delete({ url: "http://localhost:3000/api/expert/"+req.body.id},function(error, response) {
                                if (!error && response.statusCode == 200) {
                                   
                                    request.get({ url: "http://localhost:3000/api/admin/"+myAdmin.id},function(error, response, body) {
                        if (!error && response.statusCode == 200) {
                            myData2 = JSON.parse(body);
                           }});
                    request.get({ url: "http://localhost:3000/api/experts" },function(error, response, body) {
                        if (!error && response.statusCode == 200) {
                            myData = JSON.parse(body);
                            res.render('experts-table',{data: myData,data2:myData2});
                           }
                       });
                                   }
                                }); });




                                app.post('/mail-compose',urlencodedParser, function(req, res) { 
                      request.get({ url: "http://localhost:3000/api/admin/"+myAdmin.id},function(error, response, body) {
                                if (!error && response.statusCode == 200) {
                                   
                                    myData2 = JSON.parse(body);
                                    res.render('mail_compose',{data:req.body,data2:myData2});
                                   }});
                         
                                
                                }); 
                                app.get('/mail_compose',(req,res)=>{
                                    request.get({ url: "http://localhost:3000/api/admin/"+myAdmin.id},function(error, response, body) {
                                        if (!error && response.statusCode == 200) {
                                           
                                            myData2 = JSON.parse(body);
                                            res.render('mail_compose',{data:req.body,data2:myData2});
                                           }});
                                 
                                        
                                        }); 
                                   
                  

app.post('/mail_compose', urlencodedParser ,function(req,res)
{  global.mailOptions = {
    from: myAdmin.email,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text,
    
};
transporter.sendMail(mailOptions,function(err,data){
    if(err)
    {
        console.log('Error ');

    }else{
        console.log('email sent');
    }
})

    console.log(req.body.to);
    res.render('mail_compose',{data:req.body});
});




let transporter=nodemailer.createTransport({
    service:'gmail',
   
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
   
});

app.get('/configdata',urlencodedParser, function(req, res) { 
    request.get({ url: "http://localhost:3000/api/admin/"+myAdmin.id},function(error, response, body) {
              if (!error && response.statusCode == 200) {
                 
                  myData2 = JSON.parse(body); }});
                  request.get({ url: "http://localhost:3000/api/config" },function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        myData = JSON.parse(body);
                        res.render('configdata',{data: myData,data2:myData2});
                       }
                   });
            });
                


// listen on port 3000
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});