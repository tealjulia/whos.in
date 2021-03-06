const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const nodemailer = require('nodemailer');
const path = require('path');
const bodyparser = require('body-parser');
const assistants = require('./routes/api/assistants');
const suites = require('./routes/api/suites');
const providers = require('./routes/api/providers');


//Body parser configuration
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//Use routes
app.use('/api/assistants', assistants);
app.use('/api/suites', suites);
app.use('/api/providers', providers);

//production
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`Server running on port ${port}`));

//Db config
const db = require('./config/keys').mongoURI;
//Connect to mongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDb connected'))
  .catch(err => console.log(err));

  
//Passport configuration
app.use(passport.initialize());
require('./config/passport')(passport);