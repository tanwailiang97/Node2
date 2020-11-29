const { static } = require('express');
const express = require('express');
const path = require('path');
const pageRouter = require('./routes/pages');

const app = express();

//Does not allow nested object for body parser
app.use(express.urlencoded({ extended : false}));

//serve static file from public for any type of request (get,delete,post)
app.use(express.static(path.join(__dirname,'public')));

//template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//routers
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