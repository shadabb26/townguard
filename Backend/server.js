const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');
const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB)
  .then(() => console.log('Connection sucessfull'))
  .catch(() => console.log('some Error Occured'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
