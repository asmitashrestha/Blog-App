const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
const blogRouter = require('./route/BlogRoute');

require('./db')
const app = express();

app.use(cors());
app.use(express.json());

app.use('/blogs', blogRouter)

app.get('/',(req,res)=>{
  res.send("Home page")
})

app.listen(8000,()=>{
  console.log("Server started sucessfully !");
})
