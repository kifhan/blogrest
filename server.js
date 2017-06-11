var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
var port = 8888

var Post = require('./blogpost.js')

var router = require('./route')(app, Post)
var server = app.listen(port, function(){
  console.log("Express server has started on port " + port)
});

var db = mongoose.connection
mongoose.connect('mongodb://localhost/blogrest')
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function(){
  console.log("Connected to mongod server")
})


