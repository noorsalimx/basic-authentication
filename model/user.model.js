/**
 * dir/file: model\user.js
 * @author: (c) Noor Salim
 * timestamp: 2023-06-04T21:20:39 GMT+05:30
 */

const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: String,
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { collection: 'USERS', timestamps: true, versionKey: false }
);

const User = model('Users', userSchema);
module.exports = User;
