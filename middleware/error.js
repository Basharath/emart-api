const Log = require('../models/logger');

module.exports = async (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status);
  const log = new Log({
    message: err.message,
    path: req.path.toString(),
  });

  if (process.env.NODE_ENV === 'production') {
    if (status >= 500) await log.save();
  } else {
    console.log('[error]', err.message);
  }

  if (status < 500) return res.send(err.message);
  else return res.send('Something went wrong');
  // return res.send(err.message);
};

// process.on('unhandledRejection', (error) => {
//   console.log('unhandledRejection', error.message);
//   throw error;
// });
