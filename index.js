'use strict';

const express = require('express');
const multer = require('multer');//node.js middleware to handle multipart data used for uploads
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('Listening on Port: '+port);
});

var storage = multer.memoryStorage();//stores the files as buffer objects
var upload = multer({storage: storage});//set the middleware variable

app.use('/', express.static('views'));//add endpoint to serve static files from the view folder for the client application

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index.pug');
});

app.post('/upload', upload.single('data'), (req,res) => {
  if(req.file){
    res.status(200).json({
      filename: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype
    });//res a json object according to user stories
  } else {
    res.status(500).json({error:'No file was provided!'});
  }
});//use the post method with multer middleware to upload a single file with the name data
