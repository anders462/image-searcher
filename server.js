'use strict'
var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    dotenv = require('dotenv').load(),
    routes = require(process.cwd() + '/app/routes/index.js');

      //set public and bower directory paths relative to server root
    app.use('/bower_components',  express.static(process.cwd() + '/bower_components'));
    app.use('/public',  express.static(process.cwd() + '/public'));
    //set port to env.Port and 3000 as fallback
    app.set('port', (process.env.PORT || 3000));

    mongoose.connect(process.env.HEROKU_MONGO_URI || "mongodb://localhost:27017/imagesearcher");

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Database failed to connect!'));
    db.once('open', function() {
      console.log('MongoDB successfully connected on port 27017.');
    });


    routes(app);

    app.listen(app.get('port'), function(){
      console.log("server is running on port " + app.get('port') + "...");
    });
