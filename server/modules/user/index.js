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
  '/user',
  authorizeUser,
  UserController.getUser
);

Router.put(
  '/user',
  authorizeUser,
  UserController.updateUserName
);

Router.post(
  '/user/address/add',
  authorizeUser,
  UserValidator.userAddressValidators,
  validatorResponse,
  UserController.addUserAddress
);

Router.put(
  '/user/address/:id',
  authorizeUser,
  UserController.updateUserAddress
);

export default Router;
