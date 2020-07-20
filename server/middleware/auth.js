import jwt from 'jsonwebtoken';
import errorResponse from '../helpers/errorResponse';

export const decodeToken = async (token, res) => {
  try {
    return await jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return errorResponse('Invalid token. Please sign in again.', 401, res);
  }
};

export const authorizeUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return errorResponse('Please provide a token', 403, res);

    const decoded = decodeToken(token, res);
  
    const { id, firstName, role } = decoded;
    req.userId = id;
    req.userRole = role;
    req.firstName = firstName;

    return next();
  } catch (err) {
    return errorResponse(err, 500, res);
  }
};
