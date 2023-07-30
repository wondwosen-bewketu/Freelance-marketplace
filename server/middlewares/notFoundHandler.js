const notFoundHandler = (req, res, next) => {
    const error = new Error(`API route not found: ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  module.exports = notFoundHandler;
  