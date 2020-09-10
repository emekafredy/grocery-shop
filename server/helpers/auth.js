import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

import models from '../database/models/index';
import errorResponse from './errorResponse';

export const generateToken = async (user) => {
  const token = await jwt.sign(
    { id: user.id, firstName: user.name.split(' ')[0], role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return token;
};

export const attemptLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await models.User.findOne({
      where: { email }
    });

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched || !user) return errorResponse([{ msg: 'Email or password is incorrect' }], 400, res);

    const token = await generateToken(user);
    return res.status(200).json({
      success: true,
      message: 'Successful Login',
      token,
    });
  } catch (error) { /* istanbul ignore next */
    return errorResponse(error, 500, res);
  }
};
