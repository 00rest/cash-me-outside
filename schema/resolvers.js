const { AuthenticationError } = require('apollo-server-express');
const { User, Transaction } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('transactions');
    },
    user: async (parent, { name }) => {
      return User.findOne({ name }).populate('transactions');
    },
    transactions: async (parent, { name }) => {
      const params = name ? { name } : {};
      return Transaction.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { thoughtId }) => {
      return Transaction.findOne({ _id: transactionId });
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
    addTransaction: async (parent, { transactionInfo }, context) => {
      if (context.user) {
        const transaction = await Transaction.create({
          transactionInfo,
          tranactionUser: context.user.name,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { transaction: transaction._id } }
        );

        return transaction;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  }}
module.exports = resolvers;
