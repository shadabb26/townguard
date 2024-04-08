const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const issueRouter = require('./routes/issueRoutes');
const adminRouter = require('./routes/adminRoutes');
const resolverRouter = require('./routes/resolverRoutes');

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5175']
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/issues', issueRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/resolver', resolverRouter);

module.exports = app;
