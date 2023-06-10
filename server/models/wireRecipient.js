const { Schema, model } = require('mongoose');

const wireRecipient = new Schema({
  name: {
    type: String,
    required: true,
    trimmed: true,
    max_length: 50,
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
},
{
  toJSON: { getters: true, virtuals: true },
  id: false
}
);


module.exports = wireRecipient;
