import express from 'express';
import * as GroceryController from './groceryController';
import * as GroceryValidator from '../../middleware/validators/groceryValidator';
import { validatorResponse } from '../../middleware/validators/Validator';
import { authorizeUser, authorizeVendorOrAdmin } from '../../middleware/auth';

const Router = express.Router();

Router.post(
  '/grocery/new',
  authorizeUser,
  authorizeVendorOrAdmin,
  GroceryValidator.createGroceryValidators,
  validatorResponse,
  GroceryController.createGrocery
);

Router.get(
  '/groceries',
  GroceryController.allGroceries
);

Router.get(
  '/grocery/:id',
  GroceryController.getGrocery
);

Router.put(
  '/grocery/:id',
  authorizeUser,
  authorizeVendorOrAdmin,
  GroceryController.updateGrocery
);

export default Router;
