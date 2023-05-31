const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      trimmed: true,
      max_length: 50,
    },
    lastname: {
      type: String,
      required: true,
      trimmed: true,
      max_length: 50,
    },
    ssn: {
      type: Number,
      required: true,
      trimmed: true,
      max_length: 9,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: () => Promise.resolve(false),
        message: 'Email validation failed'
      }
    },
    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'transactions',
      }
    ],
  },
  {
    toJSON: { getters: true, virtuals: true },
    id: false
  }
);

// Virtual property `friendCount` that counts how many friends this looser has
userSchema.virtual('friendCount').get(function () { return `${this.friends.length}`});


const User = model('user', userSchema);

module.exports = User;
