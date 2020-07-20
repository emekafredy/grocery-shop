import express from 'express';
import * as UserController from './userController';
import * as UserValidator from '../../middleware/validators/userValidator';
import { validatorResponse } from '../../middleware/validators/Validator';
import { authorizeUser } from '../../middleware/auth';

const Router = express.Router();

Router.post(
  '/users/register',
  UserValidator.registerationValidators,
  validatorResponse,
  UserController.registerUser
);

Router.post(
  '/vendors/register',
  UserValidator.registerationValidators,
  validatorResponse,
  UserController.registerVendor
);

Router.post(
  '/users/login',
  UserValidator.loginValidators,
  validatorResponse,
  UserController.loginUser
);

Router.get(
  '/users',
  authorizeUser,
  UserController.allUsers
);

Router.get(
  '/users/:id',
  authorizeUser,
  UserController.getUser
);

export default Router;
