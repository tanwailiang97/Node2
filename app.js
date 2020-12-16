const { static } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const pageRouter = require('./routes/pages');
const superuserRouter = require('./routes/superuser');

const app = express();

//Connect to mongo db
const uri = "mongodb+srv://" + process.env.MONGO_USER + ":"+ process.env.MONGO_PASS + 
            "@cluster0.tsenn.mongodb.net/<dbname>?retryWrites=true&w=majority";
//console.log(uri);
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})



//Does not allow nested object for body parser
app.use(express.urlencoded({ extended : false}));

//serve static file from public for any type of request (get,delete,post)
app.use(express.static(path.join(__dirname,'public')));

//template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//routers
app.use('/superuser',superuserRouter);
app.use('/',pageRouter);



//errors :404 page not found
app.use((req, res, next) => {
    var err = new Error('Page not found');
    err.status = 404;
    next(err);
});

//handling error
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});

//listening to port
app.listen(3000,() =>{
    console.log('Listening from port 3000')
});

module.exports = app;