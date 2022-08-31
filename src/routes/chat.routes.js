const { Router } = require('express');
const router = Router();
const { loggerWarn } = require('../config/log4js');

router.get('/chat', (req, res) => {
  try {
    res.render('chat');
  } catch (error) {
    loggerWarn.warn(`error: ${error.message}`);
  }
});

router.get('/chat/:email', (req, res) => {
  try {
    res.render('chat', { email: req.params.email });
  } catch (error) {
    loggerWarn.warn(`error: ${error.message}`);
  }
});

module.exports = router;
