const errorResponse = (errors, statusCode, response) => response.status(statusCode).json({
  success: false,
  errors
});

export default errorResponse;
