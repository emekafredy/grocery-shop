import errorResponse from '../../helpers/errorResponse';
import models from '../../database/models';
import { trimData } from '../../helpers/utils';

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    await trimData(name);
    const existingCategory = await models.Category.findOne({ where: { name } });
    if (existingCategory) return errorResponse('You already have a similar category', 409, res);

    const category = await models.Category.create({ name });
    return res.status(201).json({ success: true, category });
  } catch (error) {
    return errorResponse(error.toString(), 500, res);
  }
};

export const allCategories = async (_req, res) => {
  try {
    const categories = await models.Category.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    return res.status(201).json({ success: true, categories });
  } catch (error) {
    return errorResponse(error.toString(), 500, res);
  }
};

export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await models.Category.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [{
        model: models.Grocery,
        as: 'groceries',
        attributes: { exclude: ['vendorId', 'createdAt', 'updatedAt'] },
      }]
    });

    return res.status(201).json({ success: true, category });
  } catch (error) {
    return errorResponse(error.toString(), 500, res);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
  
    const category = await models.Category.findOne({
      where: { id },
      attributes: { exclude: ['createdAt'] },
    });
  
    if (!category) return errorResponse('category does not exist', 409, res);
  
    await trimData(name);
    await category.update({ name: name || (category.name || 0), });
  
    return res.status(200).json({ success: true, category });
  } catch (error) {
    return errorResponse(error.toString(), 500, res);
  }
};
