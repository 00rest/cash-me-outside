const { Schema, model } = require('mongoose');
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
  type: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  amount: {
    type: mongoose.Decimal128,
    required: true,
    trim: true,
  },
  balance: {
    type: mongoose.Decimal128,
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
