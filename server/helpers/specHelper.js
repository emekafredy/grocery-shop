import models from '../database/models';
import { generateToken } from './auth';

export const clearTables = async () => {
  await models.User.destroy({ force: true, truncate: true, restartIdentity: true });
  await models.Category.destroy({ force: true, truncate: true, restartIdentity: true });
  await models.Grocery.destroy({ force: true, truncate: true, restartIdentity: true });
};

export const generateTestToken = async (email) => {
  const user = await models.User.findOne({ where: { email } });
  const token = await generateToken(user.dataValues);

  return token;
};
