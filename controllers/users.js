const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { User, validate } = require('../models/users');

const signIn = async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if(!user) return res.status(404).send('User does not exist');
    
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password');
    
    const token = jwt.sign({ email: user.email, isVendor: user.isVendor }, config.get('jwtPrivateKey'), { expiresIn: '1hr' });

    return res.send({email, id: user._id, token });
  } catch (err) {
    return res.status(500).send('Something went wrong'); 
  }
}

const signUp = async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const { name, email, isVendor = false, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if(user) return res.status(400).send('User already exists');

    user = new User({ name, email, isVendor, password }) 
    user.password = await bcrypt.hash(password, 12);

    await user.save();

    const token = jwt.sign({ email, isVendor }, config.get('jwtPrivateKey'), { expiresIn: '1hr'});

    return res.status(201).send({ email, name, isVendor, token});

  } catch (err) {
    console.log(err);
    return res.status(500).send('Something went wrong');
  }
}

module.exports = {
  signIn,
  signUp
}