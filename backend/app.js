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
  "server": 'localhost',
  "database": 'PortalCliente'
};
sql.connect(config)
.then(x=>{//console.log(x)
  console.log(`Connected to SQL Server! Database name: "${x.config.database}"`)
})
.catch(err=>console.error('Error connecting to sql', err))

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
//para cuando llama favicon.ico 
app.use((req, res, next)=>{

  if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
    return res.sendStatus(204);
  }

  return next();

});
//app.use('/', require('./routes/auth'));
//app.use('/contrato', require('./routes/contratos'));
//app.use('/cliente', require('./routes/cliente'));


// Uncomment this line for production
// app.get('/*', (req, res) => res.sendFile(__dirname + '/public/index.html'));

module.exports = app;
