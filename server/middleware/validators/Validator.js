import { validationResult } from 'express-validator';
import errorResponse from '../../helpers/errorResponse';

export const validatorResponse = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return errorResponse(errors.array(), 422, res);
  }

  next();
};
