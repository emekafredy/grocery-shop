import express from 'express';
import * as OrderController from './orderController';
import { authorizeUser } from '../../middleware/auth';

const Router = express.Router();

Router.get(
  '/orders',
  authorizeUser,
  OrderController.getOrders
);

export default Router;
