import userRouter from './user';
import groceryrouter from './grocery';
import categoryRouter from './category';
import shoppingCartRouter from './cart';

const apiPrefix = '/api';
const routes = [
  userRouter, groceryrouter, categoryRouter, shoppingCartRouter
];

const modules = (app) => {
  routes.forEach((route) => app.use(apiPrefix, route));

  app.get('/', (_req, res) => res.status(200).json({
    message: 'GROCERY-SHOP',
  }));

  app.get(apiPrefix, (_req, res) => res.status(200).json({
    message: 'Welcome to the Grocery Shop online API',
  }));

  return app;
};

export default modules;
