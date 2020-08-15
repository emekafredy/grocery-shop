import uniqid from 'uniqid';

import errorResponse from '../../helpers/errorResponse';
import models from '../../database/models';

export const generateCartId = async (_req, res) => {
  try {
    const uniqueId = uniqid();
    return res.status(201).json({ success: true, cartId: uniqueId });
  } catch (error) { /* istanbul ignore next */
    return errorResponse(error, 500, res);
  }
};

export const addToCart = async (req, res) => {
  try {
    const { groceryId } = req.params;
    const { quantity, cartId } = req.body;

    const grocery = await models.Grocery.findOne({ where: { id: groceryId } });
    if (!grocery) return errorResponse('Grocery not found', 404, res);

    const existingGrocery = await models.ShoppingCart.findOne({ where: { cartId, groceryId } });
    if (existingGrocery) return errorResponse([{ msg: 'You already have this grocery in your cart' }], 409, res);

    const newCartDetails = { groceryId, quantity, cartId };

    await models.ShoppingCart.create(newCartDetails);
    return getCart(req, res, cartId);
  } catch (error) { /* istanbul ignore next */
    return errorResponse(error, 500, res);
  }
};

export const getCart = async (req, res, cartIdParam) => {
  try {
    const { cartId } = req.params;

    const cart = await models.ShoppingCart.findAll({
      where: { cartId: cartId || cartIdParam },
      order: [['createdAt', 'ASC']],
      include: [{
        model: models.Grocery,
        attributes: { exclude: ['createdAt', 'updatedAt'], },
      }]
    });

    if (cart.length !== 0) {
      let groceryQuantity = 0;
      let groceryDiscount = 0;

      const cartValues = await Promise.all(cart.map(async (grocery) => {
        const salesDiscount = grocery.Grocery.discount > 0
          ? parseFloat((grocery.Grocery.price - grocery.Grocery.discount) * grocery.quantity)
          : parseFloat((grocery.Grocery.price) * grocery.quantity);

        groceryDiscount += salesDiscount;
        groceryQuantity += grocery.quantity;

        return {
          id: grocery.id,
          cartId: grocery.cartId,
          quantity: grocery.quantity,
          grocery: {
            name: grocery.Grocery.name,
            image: grocery.Grocery.image,
            price: parseFloat(grocery.Grocery.price - grocery.Grocery.discount),
            finalPrice: salesDiscount
          }
        };
      }));

      return res.status(200).json({
        success: true,
        message: 'cart retrieved',
        cart: cartValues,
        totalItems: groceryQuantity,
        totalPrice: groceryDiscount,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'No product found in your cart',
      cart
    });
  } catch (error) { /* istanbul ignore next */
    return errorResponse(error, 500, res);
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { id, cartId } = req.params;

    const cartItem = await models.ShoppingCart.findOne({ where: { id, cartId } });
    if (!cartItem) return errorResponse('Cart item not found', 404, res);

    const quantityUpdate = { quantity: quantity || cartItem.quantity };
    await cartItem.update(quantityUpdate);
    return getCart(req, res, cartId);
  } catch (error) { /* istanbul ignore next */
    return errorResponse(error, 500, res);
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const { id, cartId } = req.params;

    const cartItem = await models.ShoppingCart.findOne({ where: { id, cartId } });
    if (!cartItem) return errorResponse('Cart item not found', 404, res);

    await cartItem.destroy();
    return getCart(req, res, cartId);
  } catch (error) { /* istanbul ignore next */
    return errorResponse(error, 500, res);
  }
};
