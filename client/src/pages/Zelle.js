import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ZellePage = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [error, setError] = useState('');
  const [transactionHistory, setTransactionHistory] = useState([]);

  const handleSendMoney = (e) => {
    e.preventDefault();

    // Perform validation
    if (!recipient || !amount) {
      setError('Recipient and amount are required');
      return;
    }
    // Create a new transaction object
    const newTransaction = {
      recipient,
      amount,
      memo,
      date: new Date().toLocaleString() // Store the current date and time
    };

    // Update the transaction history
    setTransactionHistory([...transactionHistory, newTransaction]);

    // Reset the form after sending money
    setRecipient('');
    setAmount('');
    setMemo('');
    setError('');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Zelle</h1>
      <div className="row">
        <div className="col-md-6">
          <h3>Send Money</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSendMoney}>
            <div className="mb-3">
              <label htmlFor="recipient" className="form-label">Recipient:</label>
              <input
                type="text"
                id="recipient"
                className="form-control"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">Amount:</label>
              <input
                type="number"
                id="amount"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="memo" className="form-label">Memo (optional):</label>
              <textarea
                id="memo"
                className="form-control"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Send Money</button>
          </form>
        </div>
        <div className="col-md-6">
          <h3>Transaction History</h3>
          <ul className="list-group">
            {transactionHistory.map((transaction, index) => (
              <li className="list-group-item" key={index}>
                <div>Recipient: {transaction.recipient}</div>
                <div>Amount: {transaction.amount}</div>
                <div>Memo: {transaction.memo}</div>
                <div>Date: {transaction.date}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ZellePage;