const { Router } = require('express');
const router = Router();
const passport = require('../app/controllers/auth/passport');
const upload = require('../app/middlewares/multer');
const {
  signupReqValidation,
  loginReqValidation,
} = require('../app/middlewares/requestValidation');
const { validationResult } = require('express-validator');

router.post('/login', loginReqValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  return passport.authenticate('login', (error, accessToken) => {
    if (error !== null) {
      return res.status(404).json({
        error: err,
      });
    }

    return res.status(200).json({
      accessToken,
    });
  })(req, res, next);
});

router.post(
  '/signup',
  upload.single('foto'),
  signupReqValidation,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return passport.authenticate('signup', (err, data) => {
      if (err) return res.status(404).json({ error: err });
      if (data) {
        return res.status(200).json({ success: 'Registro exitoso!' });
      }
      return res.status(400).json({ error: 'Usuario ya existe' });
    })(req, res, next);
  }
);

module.exports = router;
