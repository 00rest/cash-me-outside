const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');

const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    getAllUsers: async () => {
      return User.find();
    },

    userById: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return User.findOne(params);
    },

    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
          .populate('accounts');
        return user;
      }
      throw new AuthenticationError('Not logged in');
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    
    createAccount: async (parent, { _id, accountType, balance }) => {
      return await User.findOneAndUpdate(
        { _id: _id },
        { $addToSet: { accounts: { accountType, balance } } },
        { new: true }
      );
    },

    createTransaction: async (parent, { _id, accountType, balance }) => {
      return await User.findOneAndUpdate(
        { _id: _id },
        { $addToSet: { accounts: { accountType, balance } } },
        { new: true }
      );
    },
  }
}



module.exports = resolvers;
