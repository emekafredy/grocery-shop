import errorResponse from '../helpers/errorResponse';

const notFound = (req, res) => {
  errorResponse('Oops! This route does not exist', 404, res);
};

export default notFound;
