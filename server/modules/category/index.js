import express from 'express';
import * as CategoryController from './categoryController';
import * as GroceryValidator from '../../middleware/validators/groceryValidator';
import { validatorResponse } from '../../middleware/validators/Validator';
import { authorizeUser, authorizeVendorOrAdmin } from '../../middleware/auth';

const Router = express.Router();

Router.post(
  '/category/new',
  authorizeUser,
  authorizeVendorOrAdmin,
  GroceryValidator.createCategoryryValidators,
  validatorResponse,
  CategoryController.createCategory
);

Router.get(
  '/categories',
  CategoryController.allCategories
);

Router.get(
  '/category/:id',
  CategoryController.getCategory
);

Router.put(
  '/category/:id',
  authorizeUser,
  authorizeVendorOrAdmin,
  CategoryController.updateCategory
);

export default Router;
