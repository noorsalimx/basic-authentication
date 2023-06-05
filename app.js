/**
 * dir/file: app.js
 * @author: (c) Noor Salim
 * timestamp: 2023-06-04T21:02:21 GMT+05:30
 */
const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routers/user.route');
const adminRoute = require('./routers/admin.route');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRouter);
app.use('/api/admin', adminRoute);
app.get('/', (req, res) => {
  res.status(200).send('Hello!');
});
app.use('/health', (req, res) => res.redirect(307, '/'));

module.exports = app;
