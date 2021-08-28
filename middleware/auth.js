const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization && authorization.split(' ')[1];

  const googleAuth = token.length > 500;

  if (!token && !googleAuth)
    return res.status(401).send('Access denied. No token provided.');

  let decodedData;
  try {
    if (token && !googleAuth) {
      decodedData = jwt.verify(token, process.env.jwtPrivateKey);
    } else {
      decodedData = jwt.decode(token);
      const { name, email } = decodedData;

      let user = await User.findOne({ email });
      if (!user) {
        user = new User({ name, email });
        await user.save();
      }
      decodedData = { ...decodedData, id: user._id.toString() };
    }
    req.user = decodedData;
    next();
  } catch (err) {
    return res.status(400).send('Invalid token');
  }
};
