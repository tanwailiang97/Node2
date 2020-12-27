const mongoose = require('mongoose');

const uri = "mongodb+srv://" + process.env.MONGO_USER + ":"+ process.env.MONGO_PASS + 
            "@cluster0.tsenn.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });


const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

connection.on('error', (err) => {
    console.log(err.message)
})

connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected.')
})
  
