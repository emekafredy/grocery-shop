import errorResponse from '../../helpers/errorResponse';
import models from '../../database/models';
import { trimData } from '../../helpers/utils';

export const createGrocery = async (req, res) => {
  try {
    const vendorId = req.user;
    const {
      name, description, price, discount, categoryId
    } = req.body;

    const newGrocery = {
      name, description, price, categoryId
    };
    await trimData(newGrocery);

    const existingGrocery = await models.Grocery.findOne({ where: { name, vendorId } });
    if (existingGrocery) return errorResponse('You already have a similar grocery', 409, res);

    const grocery = await models.Grocery.create({
      ...newGrocery,
      vendorId,
      discount: discount || 0
    });
    return res.status(201).json({
      success: true,
      message: 'Creation successful',
      grocery
    });
  } catch (error) {
    return errorResponse(error.toString(), 500, res);
  }
};

export const allGroceries = async (_req, res) => {
  try {
    const groceries = await models.Grocery.findAll({
      attributes: { exclude: ['vendorId', 'createdAt', 'updatedAt'] }
    });

    return res.status(201).json({
      success: true,
      groceries
    });
  } catch (error) {
    return errorResponse(error.toString(), 500, res);
  }
};

export const getGrocery = async (req, res) => {
  try {
    const { id } = req.params;
    const grocery = await models.Grocery.findOne({
      where: { id },
      attributes: { exclude: ['vendorId', 'createdAt', 'updatedAt'] },
      include: [{
        model: models.Category,
        as: 'category',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      }, {
        model: models.User,
        as: 'vendor',
        attributes: { exclude: ['email', 'image', 'role', 'password', 'createdAt', 'updatedAt'] },
      }]
    });

    return res.status(201).json({
      success: true,
      grocery
    });
  } catch (error) {
    return errorResponse(error.toString(), 500, res);
  }
};

export const updateGrocery = async (req, res) => {
  try {
    const vendorId = req.user;
    const { id } = req.params;
    const {
      name, description, price, discount, categoryId
    } = req.body;
  
    const grocery = await models.Grocery.findOne({
      where: { id, vendorId },
      attributes: { exclude: ['vendorId', 'createdAt', 'updatedAt'] },
    });
  
    if (!grocery) return errorResponse('Grocery does not exist', 409, res);
  
    const groceryUpdateData = {
      name: name || (grocery.name || ''),
      description: description || (grocery.description || '')
    };
  
    await trimData(groceryUpdateData);
    await grocery.update({
      ...groceryUpdateData,
      price: price || (grocery.price || 0),
      discount: discount || (grocery.discount || 0),
      categoryId: categoryId || (grocery.categoryId || 0)
    });
  
    return res.status(200).json({
      success: true,
      grocery
    });
  } catch (error) {
    return errorResponse(error.toString(), 500, res);
  }
};
