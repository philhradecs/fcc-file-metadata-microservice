'use strict';

var express = require('express');
var cors = require('cors');

var multer = require('multer');
var upload = multer().single('upfile')

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', upload, function(req, res, next) {
  const file = req.file;
  
  if (!file) {
    const error = new Error ('Please select a file.');
    return next(error);
  } 
  res.json({ name: file.originalname,
             type: file.mimetype,
             size: file.size });
});

app.use(function (err, req, res, next) {
  res.status(500).send(err.message)
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
