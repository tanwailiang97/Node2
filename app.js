const express = require('express');
const morgan = require('morgan');
const path = require('path');
const createError = require('http-errors')

require('./helpers/init-mongodb');
const { verifyAccessToken } = require('./helpers/jwt-helper')
require('./helpers/init-redis')

const pageRouter = require('./routes/pages');
const superuserRouter = require('./routes/superuser');

const AuthRoute = require('./routes/auth-route')

const app = express();


//Does not allow nested object for body parser
app.use(express.urlencoded({ extended : false}));

//serve static file from public for any type of request (get,delete,post)
app.use(express.static(path.join(__dirname,'public')));

//template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//routers
app.get('/token', verifyAccessToken, async (req, res, next) => {
  res.send('Hello from express.')
})

app.use('/auth', AuthRoute)

app.use('/superuser',superuserRouter);
app.use('/',pageRouter);


app.use(async (req, res, next) => {
    next(createError.NotFound())
});
  

//handling error
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
          status: err.status || 500,
          message: err.message,
        },
      })
});

//listening to port
app.listen(3000,() =>{
    console.log('Listening from port 3000')
});

module.exports = app;