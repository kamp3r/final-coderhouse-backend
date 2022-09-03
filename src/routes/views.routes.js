const router = require('express').Router();
const { loggerInfo, loggerWarn, loggerError } = require('../config/log4js');
const checkAuthentication = require('../app/middlewares/checkAuthentication')



module.exports = router;