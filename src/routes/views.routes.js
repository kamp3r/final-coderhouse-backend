const { Router } = require('express');
const router = Router();
const { loggerWarn } = require('../config/log4js');
const config = require('../config/config')

router.get('/chat', (req, res) => {
  try {
    res.render('chat.ejs');
  } catch (error) {
    loggerWarn.warn(`error: ${error.message}`);
  }
});

router.get('/chat', (req, res) => {
  try {
    res.render('chat.ejs');
  } catch (error) {
    loggerWarn.warn(`error: ${error.message}`);
  }
});

router.get('/serverConfig', (req, res) => {
    try{
        res.render('main.hbs', { config: config})
    }catch(error){
        loggerWarn.warn(`error: ${error.message}`);
    }
}
)

module.exports = router;