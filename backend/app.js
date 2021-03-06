const express = require('express');
const cors = require('cors');
const path = require('path');
const createError = require('http-errors')

require('./helpers/init-mongodb');
const { verifyAccessToken } = require('./helpers/jwt-helper')
require('./helpers/init-redis')

const superuserRouter = require('./routes/superuser');

const AuthRoute = require('./routes/auth-route');
const UserRoute = require('./routes/user-route');
const PhoneRoute = require('./routes/phone-route');

const app = express();
app.use(cors());

//Does not allow nested object for body parser
app.use(express.urlencoded({ extended : false}));

//serve static file from public for any type of request (get,delete,post)
app.use(express.static(path.join(__dirname,"../frontend/build")));  //

app.use('/auth-route', AuthRoute);
app.use('/user-route', UserRoute);
app.use('/phone', PhoneRoute);

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});
app.get('/home', (req,res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html')); 
});
app.get('/profile', (req,res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});
app.get('/login', (req,res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});
app.get('/register', (req,res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});
app.get('/user', (req,res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});
app.get('/mod', (req,res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});
app.get('/admin', (req,res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});
app.get('/temp', (req,res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

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

let PORT = 5000;
//listening to port
app.listen(PORT,() =>{
    console.log('Listening from port::',PORT)
});

//Closing procedures go here
process.on('SIGINT', function() {
  console.log( "\nShutting down from SIGINT (Ctrl-C)" );
  process.exit(1);
});


/**
 * sudo apt install redis-server
 * sudo service redis-server restart
 */

module.exports = app;