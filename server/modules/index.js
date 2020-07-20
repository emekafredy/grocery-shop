import userRouter from './user';

const apiPrefix = '/api';
const routes = [userRouter];

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
