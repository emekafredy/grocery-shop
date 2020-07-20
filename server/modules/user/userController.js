import errorResponse from '../../helpers/errorResponse';
import models from '../../database/models';
import { trimData } from '../../helpers/utils';
import { attemptLogin, generateToken } from '../../helpers/auth';

export const register = async (req, res, requestBody) => {
  try {
    const existingEmail = await models.User.findOne({ where: { email: req.body.email } });
    if (existingEmail) return errorResponse('Email has already been used', 409, res);

    await trimData(requestBody);
    const user = await models.User.create(requestBody);
    const token = await generateToken(user);
    return res.status(201).json({
      success: true,
      message: 'Successful user registeration',
      token
    });
  } catch (error) { /* istanbul ignore next */
    return errorResponse(error, 500, res);
  }
};

export const registerUser = async (req, res) => {
  const {
    name, email, password
  } = req.body;
  
  const newUser = {
    name, email, password
  };

  await register(req, res, newUser);
};

export const registerVendor = async (req, res) => {
  const {
    name, email, password,
  } = req.body;

  const newVendor = {
    name, email, password, role: 'vendor'
  };

  await register(req, res, newVendor);
};

export const loginUser = async (req, res) => {
  await attemptLogin(req, res);
};

export const allUsers = async (_req, res) => {
  try {
    const users = await models.User.findAll({ attributes: { exclude: ['password'] } });

    return res.status(200).json({
      success: true,
      message: 'Users retrieved',
      users
    });
  } catch (error) { /* istanbul ignore next */
    return errorResponse(error, 500, res);
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await models.User.findOne({
      where: { id },
      attributes: { exclude: ['password'] }
    });

    if (!user) return errorResponse('User does not exist', 404, res);
    
    return res.status(200).json({
      success: true,
      message: 'User retrieved',
      user
    });
  } catch (error) { /* istanbul ignore next */
    return errorResponse(error, 500, res);
  }
};
