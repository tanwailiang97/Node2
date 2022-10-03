const express = require('express');
const cors = require('cors');
const path = require('path');
const createError = require('http-errors')

const SerialPort = require('serialport').SerialPort;

let arduinoCOMPort = "COM10"

var arduinoSerialPort = new SerialPort({
  path : arduinoCOMPort,
  baudRate : 9600
});

arduinoSerialPort.on('open',function() {
  console.log('Serial Port ' + arduinoCOMPort + ' is opened.');
});

const app = express();
app.use(cors());

//Does not allow nested object for body parser
app.use(express.urlencoded({ extended : false}));

//serve static file from public for any type of request (get,delete,post)
app.use(express.static(path.join(__dirname,"../frontend/build")));  //

// app.use('/auth-route', AuthRoute);
// app.use('/user-route', UserRoute);
// app.use('/phone', PhoneRoute);

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});
app.get('/remote',(request,response) => {
  //code to perform particular action.
  //To access POST variable use req.body()methods.
  console.log(request.query.id)
  // console.log(request.body);
  if (request.query.id == 1) {
    // arduinoSerialPort.write("0\r");
    arduinoSerialPort.write("1");
    console.log("Written 1")
  }
  else if(request.query.id == 2){
    arduinoSerialPort.write("2");
    console.log("Written 2")
  }
  else {
    arduinoSerialPort.write("0")
    console.log("Written 0")
  };
  response.sendStatus(200);
});

app.get('/remotereset',(request,response) => {
  console.log(request.query.id)
  console.log(request.body);
  arduinoSerialPort.write("0");
});

app.get('/')

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