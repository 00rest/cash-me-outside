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

    getZelle: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return User.findOne({ 'zelleRecipient._id': params });
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

    createZelleRecipient: async (parent, { _id, zelle_email, name }) => {
      return await User.findOneAndUpdate(
        { _id: _id },
        { $addToSet: { zelleRecipients: { zelle_email, name } } },
        { new: true }
      );
    },

    createWireRecipient: async (parent, { _id, accountNumber, name }) => {
      return await User.findOneAndUpdate(
        { _id: _id },
        { $addToSet: { wireRecipients: { accountNumber, name } } },
        { new: true }
      );
    },

    createTransaction: async (parent, { userID, accountID, description, type, amount }) => {
      const userRec = await User.findById(userID);
      const account = userRec.accounts.find(a => a._id == accountID);

      if (!!account) {
        if (!account.transactions) {
          account.transactions = [];
        }

        const newBalance = account.balance - amount;

        account.transactions.push({
          amount: amount,
          balance: newBalance,
          description: description,
          date: new Date(),
          transactionType: type
        });

        account.balance = newBalance;

        userRec.save();
      } else {
        throw "Account not found";
      }

      return userRec;
    },

    createZelleRTransaction: async (parent, { email, description, type, amount }) => {
      const userRec = await User.findOne({ email });
      if (!user) {
        throw error;;
      }
      const account = userRec.accounts[0];
         
      if (!!account) {
        if (!account.transactions) {
          account.transactions = [];
        }
        const newBalance = account.balance + amount;
        account.transactions.push({
          amount: amount,
          balance: newBalance,
          description: description,
          date: new Date(),
          transactionType: type
        });

        account.balance = newBalance;
        userRec.save();
      } else {
        throw "Account not found";
      }

      return userRec;
    
    },
    
    createZelleRTransaction: async (parent, { accountNumber, description, type, amount }) => {
      const userRec = await User.findById(accountNumber);
      if (!user) {
        throw error;;
      }
      const account = userRec.accounts[0];
         
      if (!!account) {
        if (!account.transactions) {
          account.transactions = [];
        }
        const newBalance = account.balance + amount;
        account.transactions.push({
          amount: amount,
          balance: newBalance,
          description: description,
          date: new Date(),
          transactionType: type
        });

        account.balance = newBalance;
        userRec.save();
      } else {
        throw "Account not found";
      }

      return userRec;
    
    },
  }
}

module.exports = resolvers;