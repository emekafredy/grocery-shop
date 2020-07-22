import { check } from 'express-validator';

export const createGroceryValidators = [
  check('name')
    .not().isEmpty()
    .withMessage('Name cannot be empty'),
  check('description')
    .isLength({ min: 10 })
    .withMessage('Grocery description must be at least 10 chars long'),
  check('price')
    .not().isEmpty()
    .withMessage('Grocery price cannot be empty'),
  check('categoryId')
    .not().isEmpty()
    .withMessage('Grocery category cannot be empty')
];

export const createCategoryryValidators = [
  check('name')
    .not().isEmpty()
    .withMessage('Name cannot be empty'),
];
