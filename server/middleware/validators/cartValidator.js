import { check } from 'express-validator';

export const addToCartValidators = [
  check('quantity')
    .not().isEmpty()
    .withMessage('Please provide the quantity you need'),
  check('cartId')
    .not().isEmpty()
    .withMessage('CartId is missing')
];

export const updateCartItemValidators = [
  check('cartId')
    .not().isEmpty()
    .withMessage('CartId is missing')
];
