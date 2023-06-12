const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const transactionSchema = require('./transactionSchema');

const accountSchema = new Schema({
  dateCreated: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  accountType: {
    type: String,
     minlength: 1,
    maxlength: 280,
    trim: true,
  },
  balance: {
    type: Number,
    required: true,
    trim: true,
  },
  transactions: [ transactionSchema ],
},
{
  toJSON: { getters: true, virtuals: true },
  id: false
}
);


module.exports = accountSchema;
