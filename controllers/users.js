const bcrypt = require('bcryptjs');
const { User, validate } = require('../models/user');

const signIn = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('Invalid email or password');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send('Invalid email or password');

    const token = user.generateToken();

    return res.send({ token });
  } catch (err) {
    next(err);
  }
};

const signUp = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, isVendor = false, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).send('User already exists');

    user = new User({ name, email, isVendor, password });
    user.password = await bcrypt.hash(password, 12);

    await user.save();

    const token = user.generateToken();

    return res.status(201).send({ id: user._id, email, token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signIn,
  signUp,
};
