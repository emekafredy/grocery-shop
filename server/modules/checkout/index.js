import express from 'express';
import * as CheckoutController from './checkoutController';
import { authorizeUser } from '../../middleware/auth';

const Router = express.Router();

Router.get(
  '/payments',
  authorizeUser,
  CheckoutController.getCheckout
);

Router.post(
  '/charge',
  authorizeUser,
  CheckoutController.makePayment
);

export default Router;
