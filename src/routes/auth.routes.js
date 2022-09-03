const { Router } = require('express');
const router = Router();
const passport = require('../app/controllers/auth/passport');
const upload = require('../app/middlewares/multer');
const {
  signupReqValidation,
  loginReqValidation,
} = require('../app/middlewares/requestValidation');
const { validationResult } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: Auth
 */
/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: 'Login User'
 *     description: Login User
 *     tags: [Auth]
 *     parameters:
 *     - name: 'body'
 *       in: 'body'
 *       description: 'Fields to login'
 *       schema:
 *         type: 'object'
 *         properties:
 *           email:
 *             type: 'string'
 *             required: true
 *           password:
 *             type: 'string'
 *             required: true
 *     responses:
 *       200:
 *         description: 'Login success'
 *       404:
 *         description: 'Error on user or password'
 */
router.post('/login', loginReqValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  return passport.authenticate('login', (error, accessToken) => {
    if (error !== null) {
      return res.status(404).json({
        error: { error: 'Error user or password incorrect'},
      });
    }

    return res.status(200).json({
      accessToken,
    });
  })(req, res, next);
});

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     summary: 'Register User'
 *     description: Register of User
 *     tags: [Auth]
 *     parameters:
 *     - name: 'body'
 *       in: 'body'
 *       description: 'Fields to register'
 *       schema:
 *         type: 'object'
 *         properties:
 *           name:
 *             type: 'string'
 *             required: true
 *           email:
 *             type: 'string'
 *             required: true
 *           password:
 *             type: 'string'
 *             required: true
 *           address:
 *             type: 'string'
 *             required: true
 *           age:
 *             type: 'integer'
 *             example: 30
 *           telephone:
 *             type: 'string'
 *             example: +5401166889911
 *             required: true
 *           picture:
 *             type: 'string'
 *     responses:
 *       200:
 *         description: 'Singup success'
 *       400:
 *         description: 'Error on data'
 */

router.post(
  '/signup',
  upload.single('picture'),
  signupReqValidation,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return passport.authenticate('signup', (err, data) => {
      if (err) return res.status(404).json({ error: err });
      if (data) {
        return res.status(200).json({ success: 'Sign Up Success' });
      }
      return res.status(400).json({ error: 'User already exists' });
    })(req, res, next);
  }
);


module.exports = router;
