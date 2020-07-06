const express = require('express');

// ROUTES
const auth =  require('./routes/auth');
const position =  require('./routes/position');
const category =  require('./routes/category');
const order =  require('./routes/order');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

// Connect with Mongo
const uri = require("./config/keys");

mongoose.connect(uri.mongoURI)
.then(() => console.log("Connected with MongoDB successfully!"))
.catch(err => console.log(err))

// PASSPORT INIT
app.use(passport.initialize());
// SEND PASSPORT TO MIDDLEWARE
require('./middleware/passport')(passport);

// Logger
app.use( require('morgan')('dev'));

// OPEN ACCESS TO IMAGE
app.use('/uploads', express.static('/uploads'));

// BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors
app.use(require('cors')());

// ROUTES
app.use('/api/auth', auth);
app.use('/api/category', category);
app.use('/api/position', position);
app.use('/api/order', order);

module.exports = app;