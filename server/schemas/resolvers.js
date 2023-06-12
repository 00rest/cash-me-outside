const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');

const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    getAllUsers: async () => {
      return User.find();
    },

    user: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return User.findOne( params );
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

  },

  Mutation: {
      addUser: async (parent, { name, email, password, snn }) => {
        const user = await User.create({ name, email, password, snn });
        const token = signToken(user);
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError('No user found with this email address');
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }

        const token = signToken(user);

        return { token, user };
},
      createAccount: async (parent, {_id, accountType, balance}) => {
        return await User.findOneAndUpdate(
            { _id: _id },
            { $addToSet: {accounts: {accountType, balance }}},
            { new: true }
  ); 
},
//       createUser: async (parent, args) => {
//         const newUser = await User.create(args);
//  // const token = signToken(user);

//         return newUser;
// }
}
}





    

module.exports = resolvers;
