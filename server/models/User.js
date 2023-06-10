const { Schema, model } = require('mongoose');
const zelleRecipient = require('./zelleRecipient');
const wireRecipient = require('./wireRecipient');
const accountSchema = require('./accountSchema');


const userSchema = new Schema(
  {
    name: {
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
      // validate: {
      //   validator: () => Promise.resolve(false),
      //   message: 'Email validation failed'
      // }
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    accounts: [ accountSchema ],
    zelleRecipients: [ zelleRecipient ],
    wireRecipients: [ wireRecipient ],
  },
  {
    toJSON: { getters: true, virtuals: true },
    id: false
  }
);

// jordan added to add pre-saved to create password
// userSchema.pre('save', async function (next) {
//   if (this.isNew || this.isModified('password')) {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//   }

//   next();
// });

// userSchema.methods.isCorrectPassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };


const User = model('user', userSchema);

module.exports = User;
