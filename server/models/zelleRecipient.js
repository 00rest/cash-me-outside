const { Schema, model } = require('mongoose');

const zelleRecipient = new Schema({
  name: {
    type: String,
    required: true,
    trimmed: true,
    max_length: 50,
  },
  zelle_email: {
    type: String,
    required: true,
  },
},
{
  toJSON: { getters: true, virtuals: true },
  id: false
}
);


module.exports = zelleRecipient;
