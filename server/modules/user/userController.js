import errorResponse from '../../helpers/errorResponse';
import models from '../../database/models';
import { trimData } from '../../helpers/utils';
import { attemptLogin, generateToken } from '../../helpers/auth';

export const register = async (req, res, requestBody) => {
  try {
    const existingEmail = await models.User.findOne({ where: { email: req.body.email } });
    if (existingEmail) return errorResponse([{ msg: 'Email has already been used' }], 409, res);

    if (req.body.vendorName) {
      const existingVendorName = await models.User.findOne({ where: { vendorName: req.body.vendorName } });
      if (existingVendorName) return errorResponse('Vendor name has already been used', 409, res);
    }

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
    name, email, password, confirmPassword
  } = req.body;
  
  const newUser = {
    name, email, password, confirmPassword
  };

  await register(req, res, newUser);
};

export const registerVendor = async (req, res) => {
  const {
    name, email, password, vendorName,
  } = req.body;

  const newVendor = {
    name, email, password, vendorName, role: 'vendor'
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
    const userId = req.user;
    const user = await models.User.findOne({
      where: { id: userId },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
      include: [{
        model: models.Address,
        as: 'addresses',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      }]
    });

    if (!user) return errorResponse('User does not exist', 404, res);
    
    return res.status(200).json({
      success: true,
      message: 'User retrieved',
      user
    });
  } catch (error) { /* istanbul ignore next */
    return errorResponse(error.toString(), 500, res);
  }
};

export const updateUserName = async (req, res) => {
  try {
    const userId = req.user;
    const { name } = req.body;
  
    const user = await models.User.findOne({
      where: { id: userId },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });
  
    if (!user) return errorResponse('User does not exist', 409, res);
  
    const userUpdateName = { name: name || (user.name || '') };
  
    await trimData(userUpdateName);
    await user.update(userUpdateName);
  
    return res.status(201).json({
      success: true,
      user
    });
  } catch (error) {
    return errorResponse(error.toString(), 500, res);
  }
};

export const addUserAddress = async (req, res) => {
  try {
    const userId = req.user;
    const { name } = req.body;

    const existingAddress = await models.Address.findOne({ where: { name, userId } });
    if (existingAddress) return errorResponse('You already have a similar address', 409, res);

    await trimData({ name });
    const newAddress = await models.Address.create({ name, userId });
    return res.status(201).json({
      success: true,
      newAddress
    });
  } catch (error) {
    return errorResponse(error.toString(), 500, res);
  }
};

export const updateUserAddress = async (req, res) => {
  try {
    const userId = req.user;
    const { name } = req.body;
    const { id } = req.params;
  
    const address = await models.Address.findOne({ where: { id, userId } });
  
    if (!address) return errorResponse('Address does not exist', 409, res);
  
    const adressUpdateName = { name: name || (address.name || '') };
  
    await trimData(adressUpdateName);
    await address.update(adressUpdateName);
  
    return res.status(201).json({
      success: true,
      address
    });
  } catch (error) {
    return errorResponse(error.toString(), 500, res);
  }
};

export const allVendors = async (_req, res) => {
  try {
    const vendors = await models.User.findAll({
      where: { role: 'vendor' },
      attributes: { exclude: ['createdAt', 'updatedAt', 'password', 'role', 'email', 'id'] },
    });

    return res.status(200).json({
      success: true,
      vendors
    });
  } catch (error) {
    return errorResponse(error.toString(), 500, res);
  }
};

export const getVendor = async (req, res) => {
  try {
    const { vendorName } = req.params;
    const vendors = await models.User.findOne({
      where: { vendorName },
      attributes: { exclude: ['createdAt', 'updatedAt', 'password', 'role', 'email', 'id'] },
      include: [{
        model: models.Grocery,
        as: 'groceries',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      }]
    });

    return res.status(200).json({
      success: true,
      vendors
    });
  } catch (error) {
    return errorResponse(error.toString(), 500, res);
  }
};
