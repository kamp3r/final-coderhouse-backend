const { loggerWarn } = require("../../config/log4js");
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const checkAuthentication = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(403).json({ error: 'Debe proveer el token' });
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

module.exports = checkAuthentication;