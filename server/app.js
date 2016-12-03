'use strict';

import express from 'express';
import multer from 'multer';//node.js middleware to handle multipart data used for uploads
export const app = express();

var storage = multer.memoryStorage();//stores the files as buffer objects
var upload = multer({storage: storage});//set the middleware variable

app.use('/', express.static('client'));//add endpoint to serve static files from the client folder for the client application

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
