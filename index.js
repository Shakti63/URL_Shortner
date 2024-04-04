const express = require('express');
const app= express();

const PORT = process.env.PORT || 8000



app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended: true}))

const urlRouter= require('./routes/urlRoute');
const { default: mongoose } = require('mongoose');
app.use("/", urlRouter)

const dbConnect =require('./config/database');
dbConnect();

app.listen(PORT, ()=>{
  console.log("server is started ")
})