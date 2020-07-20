import { check } from 'express-validator';

export const registerationValidators = [
  check('name')
    .isLength({ min: 3 })
    .withMessage('name must be at least 3 chars long'),
  check('email')
    .isEmail()
    .withMessage('email is either absent or not valid'),
  check('password')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 chars long')
];

export const loginValidators = [
  check('email').trim()
    .not().isEmpty()
    .withMessage('email cannot be empty'),
  check('password').trim()
    .not().isEmpty()
    .withMessage('password cannot be empty')
];
