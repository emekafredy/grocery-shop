import Sequelize from 'sequelize';
import config from '../config';

const {
  database, username, password, env
} = config.development;

const sequelize = new Sequelize(database, username, password, env);

const models = {
  User: sequelize.import('./user')
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
