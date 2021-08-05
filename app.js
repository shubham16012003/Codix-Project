const express = require('express')
const app = express();
const morgan = require('morgan')
const bodyParser =require('body-parser')
const mongoose = require('mongoose')

const UserRoutes =require('./api/User')



const DB ='mongodb+srv://shubham16012003:mehta16@cluster0.sztop.mongodb.net/INFO-API?retryWrites=true&w=majority'
mongoose.connect(DB, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log('connection Succesful');
}).catch((error)=> console.log('No Connection'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/user',UserRoutes)


app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });

module.exports=app;