import stripe from 'stripe';
import errorResponse from '../../helpers/errorResponse';
import models from '../../database/models';

const stripeKey = stripe(process.env.STRIPE_SECRET_KEY);
const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

export const getCheckout = async (_req, res) => {
  res.json({ publishableKey });
};

export const makePayment = async (req, res) => {
  try {
    const userId = req.user;
    const {
      stripeEmail, stripeToken, purchasePrice, cartId
    } = req.body;

    const customer = await stripeKey.customers.create({
      email: stripeEmail,
      source: stripeToken
    });

    const payment = await stripeKey.charges.create({
      amount: purchasePrice * 100,
      description: 'Payment for groceries',
      currency: 'usd',
      customer: customer.id
    });

    const cart = await models.ShoppingCart.findAll({
      where: { cartId },
      include: [{
        model: models.Grocery,
        attributes: { exclude: ['createdAt', 'updatedAt'], },
      }]
    });

    // const user = await models.Customer.findOne({ where: { customer_id: userId } });

    if (cart.length > 0) {
      const cartValues = await Promise.all(cart.map(async (grocery) => ({
        totalCost: grocery.quantity * (grocery.Grocery.price - grocery.Grocery.discount),
        comments: payment.description,
        customerId: userId,
        reference: payment.balance_transaction,
        groceryId: grocery.Grocery.id,
        groceryName: grocery.Grocery.name,
        quantity: grocery.quantity,
        unitCost: (grocery.Grocery.price - grocery.Grocery.discount)
      })));

      const createOrder = await models.Order.bulkCreate(cartValues);
      if (createOrder) {
        // await sendOrderConfirmation(user.name, cartValues, user.email);
        await models.ShoppingCart.destroy({ where: { cartId } });
        return res.status(200).json({
          success: true,
          message: 'Payment successfully made'
        });
      }
      return errorResponse('Payment not successful', 500, res);
    }
  } catch (error) { /* istanbul ignore next */
    return errorResponse(error, 500, res);
  }
};
