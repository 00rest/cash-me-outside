const connection = require('../config/connection');
const { User } = require('../models');

db.once('open', async () => {
  try {
    await Transaction.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < transactionSeeds.length; i++) {
      const { _id, transactionUser } = await Transaction.create(transactionSeeds[i]);
      const user = await User.findOneAndUpdate(
        { name: transactionUser },
        {
          $addToSet: {
            transactions: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
