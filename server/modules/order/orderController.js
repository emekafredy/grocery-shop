import errorResponse from '../../helpers/errorResponse';
import models from '../../database/models';

export const getOrders = async (req, res) => {
  try {
    const userId = req.user;

    const orders = await models.Order.findAll({
      where: { customerId: userId },
      include: [{
        model: models.Grocery,
        as: 'grocery',
        attributes: { exclude: ['createdAt', 'updatedAt'], },
      }]
    });
    
    if (orders.length !== 0) {
      const orderValues = await Promise.all(orders.map(async (order) => ({
        id: order.id,
        user: order.customerId,
        quantity: order.quantity,
        totalCost: order.totalCost,
        status: order.status,
        comments: order.comments,
        createdOn: order.createdAt,
        grocery: {
          name: order.grocery.name,
          price: order.grocery.price - order.grocery.discount,
          image: order.grocery.image,
          groceryTotalPrice: order.totalCost
        }
      })));

      return res.status(200).json({
        success: true,
        message: 'orders succesfully retrieved',
        order: orderValues
      });
    }

    return res.status(200).json({ success: true, message: 'No order found' });
  } catch (error) {
    return errorResponse(error.toString(), 500, res);
  }
};
