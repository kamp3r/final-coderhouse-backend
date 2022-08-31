const { check } = require('express-validator');

const signupReqValidation = [
  check('username')
    .exists()
    .notEmpty()
    .withMessage('El campo username es requerido')
    .isEmail()
    .withMessage('El campo username debe ser un email valido'),
  check('password')
    .exists()
    .notEmpty()
    .withMessage('El campo password es requerido')
    .isString()
    .withMessage('El campo password debe ser de tipo string'),
  check('nombre')
    .exists()
    .notEmpty()
    .withMessage('El campo nombre es requerido')
    .isString()
    .withMessage('El campo nombre debe ser de tipo string'),
  check('direccion')
    .exists()
    .notEmpty()
    .withMessage('El campo dirección es requerido')
    .isString()
    .withMessage('El campo direccion debe ser de tipo string'),
  check('edad')
    .exists()
    .notEmpty()
    .withMessage('El campo edad es requerido')
    .isInt({ min: 18 })
    .withMessage('El campo edad debe ser de tipo entero mayor a 18 años'),
  check('telefono')
    .exists()
    .notEmpty()
    .withMessage('El campo telefono es requerido')
    .isString()
    .withMessage('El campo telefono debe ser de tipo string'),
];

const loginReqValidation = [
  check('username')
    .exists()
    .notEmpty()
    .withMessage('El campo username es requerido')
    .isEmail()
    .withMessage('El campo username debe ser un email valido'),
  check('password')
    .exists()
    .notEmpty()
    .withMessage('El campo password es requerido')
    .isString()
    .withMessage('El campo password debe ser de tipo string'),
];

const productReqValidation = [
  check('codigo')
    .isString()
    .withMessage('El campo codigo debe ser de tipo string')
    .exists()
    .notEmpty()
    .withMessage('El campo codigo es requerido'),
  check('nombre')
    .exists()
    .notEmpty()
    .withMessage('El campo nombre es requerido')
    .isString()
    .withMessage('El campo nombre debe ser de tipo string'),
  check('descripcion')
    .exists()
    .notEmpty()
    .withMessage('El campo descripcion es requerido')
    .isString()
    .withMessage('El campo descripcion debe ser de tipo string'),
  check('precio')
    .exists()
    .notEmpty()
    .withMessage('El campo precio es requerido')
    .isFloat({ min: 1 })
    .withMessage('El campo precio debe ser un numero mayor que 0'),
  check('stock')
    .exists()
    .notEmpty()
    .withMessage('El campo stock es requerido')
    .isInt({ min: 0 })
    .withMessage('El campo stock debe ser de tipo entero mayor o igual a 0'),
];

module.exports = {
  signupReqValidation,
  loginReqValidation,
  productReqValidation,
};
