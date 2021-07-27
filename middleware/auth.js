const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization && authorization.split(' ')[1];

  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decodedData = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decodedData;
    next();
  } catch (err) {
    return res.status(400).send('Invalid token');
  }
};
