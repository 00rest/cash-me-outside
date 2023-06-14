import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TRANSACTION } from '../utils/mutations';
import 'bootstrap/dist/css/bootstrap.min.css';
import auth from '../utils/auth';

const WithdrawPage = () => {
  const [accounts, updateAccounts] = useState(JSON.parse(localStorage.getItem("user_accounts") || "[]"));
  const userData = auth.getSession();

  console.log("accounts: ", accounts);

  const _mapAccountsToViewModel = input => input.filter(a => !!a.transactions && !!a.transactions.length)
  .map(a => a.transactions
    .map(sa => ({
      ...sa, 
      accountType: a.accountType,
      senderAccount: a._id
    })))
  .flat();

  const [senderAccount, setsenderAccount] = useState('') //!!accounts && !!accounts.length ? accounts[0]._id : '');
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState('');
  const [transactionHistory, setTransactionHistory] = useState(
    !!accounts && !!accounts.length ? 
      _mapAccountsToViewModel(accounts)
    : []);

  const [addTransaction] = useMutation(ADD_TRANSACTION);

  const handleTransfer = async (e) => {
    e.preventDefault();

    // Perform validation
    if (!senderAccount || !amount) {
      setError('Source account and amount are required');
      return;
    }

    const acc = accounts.find(a => a._id === senderAccount);

    if(!acc) {
      setError("Account not found");
      return;
    }

    if(acc.balance < amount) {
      setError("Insufficient funds");
      return;
    }

    const newTransaction = {
      senderAccount,
        amount,
      date: new Date().toLocaleString() // Store the current date and time
    };
    
    try {
      const mutationResponse = await addTransaction({
        variables: { 
          userID: userData.userId,
          accountID: senderAccount,
          description: "Cash withdrawal on " + new Date().toLocaleString(),
          type: "CASH",
          amount: parseFloat(amount || 0)
        }
      });
      
      console.log("res: ", mutationResponse.data);

      // Update balances
      if(mutationResponse.data && mutationResponse.data.createTransaction && mutationResponse.data.createTransaction.accounts && !!mutationResponse.data.createTransaction.accounts.length) {
        
        console.log(mutationResponse.data.createTransaction.accounts);
        const newModel = _mapAccountsToViewModel(mutationResponse.data.createTransaction.accounts);
        console.log("NEW MOEL: ", newModel);
        updateAccounts(newModel);

        localStorage.setItem("user_accounts", JSON.stringify(mutationResponse.data.createTransaction.accounts || []));

      } else {
        console.error("Assertion failed");
      }

      // Update the transaction history
      setTransactionHistory([...transactionHistory, newTransaction]);

      // Reset the form after the transfer
      setsenderAccount('');

      setAmount('');
      setError('');
    } catch(ee) {
      console.log(ee);
      setError("An error occurred, please see log.");
    }
  };

  if(!accounts || !accounts.length) {
    return(<div className="container mt-5 d-flex-column min-vh-100">
      <h1 className="mb-4">Withdraw Money</h1>
    </div>)
  }

  return (
    <div className="container mt-5 d-flex-column min-vh-100">
      <h1 className="mb-4">Withdraw Money</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleTransfer}>
        <div className="mb-3">
          <label htmlFor="senderAccount" className="form-label" style={{marginRight: "2ch" }}>From Account:</label>
          <select name='senderAccount' id='senderAccount' value={senderAccount} onChange={(e) => setsenderAccount(e.target.value)}>
            <option value="">(Please select an account)</option>
            {accounts.map(a => <option value={a._id}>({a.accountType.toUpperCase()}) - {a._id}: ${a.balance}</option>)}
          </select>
          {/* <input
            type="text"
            id="senderAccount"
            value={senderAccount}
            onChange={(e) => setsenderAccount(e.target.value)}
            className="form-control"
          /> */}
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Transfer</button>
      </form>
      <div className="col-md-6" style={{marginTop: "5ch"}}>
          <h3>Transaction History</h3>
          <ul className="list-group">
            {transactionHistory.map((transaction, index) => (
              <li className="list-group-item" key={index}>
                <div>From: {transaction.senderAccount}</div>
                <div>Amount: ${transaction.amount}</div>
                <div>Date: {transaction.date}</div>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
};

export default WithdrawPage;