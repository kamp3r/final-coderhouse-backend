const { loggerWarn } = require("../../config/log4js");
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const redirectAuthentication = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.redirect('/login')
        }

        jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, value) => {
            if (err) return res.status(500).json({ error: 'Fallo la autenticacion con token' });

            req.user = value.data;
            next();
        });
    } catch (error) {
        loggerWarn.warn(error);
    }
}

module.exports = redirectAuthentication;