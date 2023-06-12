const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const transactionSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  transactionType: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    trim: true,
  },
  balance: {
    type: Number,
    required: true,
    trim: true,
  }
},
{
  toJSON: { getters: true, virtuals: true },
  id: false
}
);


module.exports = transactionSchema;
