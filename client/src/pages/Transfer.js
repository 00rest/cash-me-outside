import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TransferPage = () => {
  const [senderAccount, setsenderAccount] = useState('');
  const [recipient, setrecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [transactionHistory, setTransactionHistory] = useState([]);

  const handleTransfer = (e) => {
    e.preventDefault();

    // Perform validation
    if (!senderAccount || !recipient || !amount) {
      setError('Sender, recipient, and amount are required');
      return;
    }

    const newTransaction = {
      senderAccount,
      recipient,
      amount,
      date: new Date().toLocaleString() // Store the current date and time
    };

    // Update the transaction history
    setTransactionHistory([...transactionHistory, newTransaction]);

    // Reset the form after the transfer
    setsenderAccount('');
    setrecipient('');
    setAmount('');
    setError('');
  };

  return (
    <div className="container mt-5 d-flex-column min-vh-100">
      <h1 className="mb-4">Transfer Money</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleTransfer}>
        <div className="mb-3">
          <label htmlFor="senderAccount" className="form-label">From Account:</label>
          <input
            type="text"
            id="senderAccount"
            value={senderAccount}
            onChange={(e) => setsenderAccount(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="recipient" className="form-label">To Account:</label>
          <input
            type="text"
            id="recipient"
            value={recipient}
            onChange={(e) => setrecipient(e.target.value)}
            className="form-control"
          />
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
      <div className="col-md-6">
          <h3>Transaction History</h3>
          <ul className="list-group">
            {transactionHistory.map((transaction, index) => (
              <li className="list-group-item" key={index}>
                <div>From: {transaction.senderAccount}</div>
                <div>To: {transaction.recipient}</div>
                <div>Amount: {transaction.amount}</div>
                <div>Date: {transaction.date}</div>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
};

export default TransferPage;