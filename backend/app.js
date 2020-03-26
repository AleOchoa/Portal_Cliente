require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
//const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');
const sql = require('mssql')


const config = {
  "user": 'Ale',
  "password": '123',
  "server": 'DESKTOP-JCS4PJ6',//'localhost',
  "database": 'PortalCliente'
};
sql.connect(config)
.then(x=>{//console.log(x)
  console.log(`Connected to SQL Server! Database name: "${x.config.database}"`)
})
.catch(err=>console.error('Error connecting to sql', err))
/*mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error('Error connecting to mongo', err));
*/
const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3001', process.env.FRONTENDPOINT]
  })
);

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET,
    cookie: { maxAge: 1000 * 60 * 60 }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));


app.use('/', require('./routes/index'));
app.use('/', require('./routes/auth'));
app.use('/contrato', require('./routes/contratos'));
app.use('/cliente', require('./routes/cliente'));

/*app.get('/', function (req, res) {
   
  var sql = require("mssql");

  // config for your database
  var config = {
      user: 'Ale',
      password: '123',
      server: 'localhost', 
      database: 'PortalCliente' 
  };

  // connect to your database
  sql.connect(config, function (err) {
  
      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();
         
      // query to the database and get the records
      request.query('select * from Empresa', function (err, recordset) {
          
          if (err) console.log(err)

          // send records as a response
          res.send(recordset);
          
      });
  });
});*/
// Uncomment this line for production
// app.get('/*', (req, res) => res.sendFile(__dirname + '/public/index.html'));

module.exports = app;
