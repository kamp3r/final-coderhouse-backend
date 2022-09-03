const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const userController = require('../users');
const config = require('../../../config/config');
const { enviarMailRegistroUsuario } = require('../../helpers/sendMail');
const { loggerWarn } = require('../../../config/log4js');

passport.use(
  'login',
  new LocalStrategy(
    {
      session: false,
      passReqToCallback: true,
      usernameField: 'email'
    },
    async (req, email, password, done) => {
      try {
        const user = await userController.list({ email: email });

        if (!user.length) {
          return done(null, false, loggerWarn.warn('Usuario no existe!'));
        }

        if (!isValidPassword(user[0], password)) {
          return done(null, false, loggerWarn.warn('Password incorrecto!'));
        }

        return done(null, generarToken(user[0]));
      } catch (error) {
        return done(error);
      }
    }
  )
);

const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

const generarToken = (user) => {
  return jwt.sign({ data: user }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: config.TOKEN_EXPIRATION_TIME,
  });
};

passport.use(
  'signup',
  new LocalStrategy(
    {
      session: false,
      passReqToCallback: true,
      usernameField: 'email'
    },
    (req, email, password, done) => {
      try {
        findOrCreateUser = async () => {
          const user = await userController.list({ email: email });
          if (user.length) {
            return done(null, false, loggerWarn.warn('User already exists'));
          }
          let { name, address, age, telephone } = req.body;
          let picture = req.file == undefined ? null : req.file.filename;

          const newUser = {
            email: email,
            password: createHash(password),
            name: name,
            address: address,
            age: age,
            telephone: telephone,
            picture: picture,
          };

          const userSaved = await userController.save(newUser);

          enviarMailRegistroUsuario(newUser);

          return done(null, userSaved);
        };

        process.nextTick(findOrCreateUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  let user = await userController.listId(id);
  done(null, user);
});

module.exports = passport;
