const mongoose = require('mongoose');

const { db } = process.env;

module.exports = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log('Connected to MongoDb'))
    .catch((err) => console.log(err.message));
};
