module.exports = (req, res, next) => {
  const error = new Error('No resource found');
  error.status = 404;

  next(error);
};
