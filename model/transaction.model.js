/**
 * dir/file: model\transactions.model.js
 * @author: (c) Noor Salim
 * timestamp: 2023-06-06T00:25:20 GMT+05:30
 */

const { Schema, model } = require('mongoose');

const coordinateSchema = new Schema(
  {
    latitude: {
      type: String,
      require: true,
    },
    longitude: {
      type: String,
      require: true,
    },
  },
  { _id: false }
);

const transactionSchema = new Schema(
  {
    name: String,
    username: {
      type: String,
      required: true,
    },
    inTime: {
      type: Date,
      default: '',
    },
    outTime: {
      type: Date,
      default: null,
    },
    checkInLocation: {
      type: coordinateSchema,
    },
    checkOutLocation: {
      type: coordinateSchema,
      default: null,
    },
  },
  { collection: 'TRANSACTIONS', timestamps: true, versionKey: false }
);

const Transaction = model('Transaction', transactionSchema);
module.exports = Transaction;
