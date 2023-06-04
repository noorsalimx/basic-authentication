/**
 * dir/file: app.js
 * @author: (c) Noor Salim
 * timestamp: 2023-06-04T21:02:21 GMT+05:30
 */
const express = require('express');
const app = express();
const userRouter = require('./routers/user.route');

app.use(express.json());
app.use('/health', (req, res) => {
  res.status(200).send('Hello!');
});
app.use('/api/user', userRouter);
app.use('/api/admin', userRouter);

module.exports = app;
