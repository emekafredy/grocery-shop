import jwt from 'jsonwebtoken';
import errorResponse from '../helpers/errorResponse';

export const authorizeUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return errorResponse('Please provide a token', 403, res);

    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return errorResponse('Invalid token. Please sign in again.', 401, res);
      }
      req.user = decoded.id;
      req.role = decoded.role;
      return next();
    });
  } catch (err) { /* istanbul ignore next */
    return errorResponse(err, 500, res);
  }
};

export const authorizeVendorOrAdmin = async (req, res, next) => {
  const { role } = req;

  if (!(role === 'vendor' || role === 'admin')) {
    return errorResponse('You cannot perform this action', 401, res);
  }

  return next();
};

export const authorizeAdmin = async (req, res, next) => {
  const { role } = req;

  if (!(role === 'admin')) {
    return errorResponse('You cannot perform this action', 401, res);
  }

  return next();
};
