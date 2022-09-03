const express = require('express');
const passport = require('passport');
const handlebars = require('express-handlebars')
const routerAPI = require('../../routes/index.routes');
const cookieParser = require('cookie-parser');
const error404 = require('./error404');
const errorHandler = require('./errorHandler');


const connectMiddleware = (app) => {
  app.use(express.static(process.cwd() + '/src/public'));
  app.set('view engine', 'ejs');
  app.set('views', process.cwd() + '/src/public/views');
  app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    helpers: {
      eq: function(val1, val2){
        if(val1 === val2) {
          return true
        }else{
          return false
        }
      }
    }
  }))
  app.set('view engine', 'hbs')
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  passport.initialize();
  app.use(cookieParser());
  routerAPI(app);
  app.use(error404);
  app.use(errorHandler);
};

module.exports = connectMiddleware;
