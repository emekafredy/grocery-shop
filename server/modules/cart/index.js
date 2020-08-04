import express from 'express';
import * as CartController from './cartController';
import * as CartValidator from '../../middleware/validators/cartValidator';
import { validatorResponse } from '../../middleware/validators/Validator';

const Router = express.Router();

Router.get(
  '/shopping-cart/generateId',
  CartController.generateCartId
);

Router.post(
  '/shopping-cart/:groceryId',
  CartValidator.addToCartValidators,
  validatorResponse,
  CartController.addToCart
);

Router.get(
  '/shopping-cart/:cartId',
  CartController.getCart
);

export default Router;
