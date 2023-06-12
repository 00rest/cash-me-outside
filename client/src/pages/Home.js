import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  return (
    <div className="container mt-5 d-flex-column min-vh-100">
      <h1 className="mb-4">Welcome to Cash Me Outsite Bank</h1>
      <p>View your account balance and recent transactions.</p>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Checking Account Balance</h5>
              <p className="card-text">$2,000.00</p>
              <a href="#" className="btn btn-primary">View Details</a>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Saving Account Balance</h5>
              <p className="card-text">$10,000.00</p>
              <a href="#" className="btn btn-primary">View Details</a>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Credit Card Balance</h5>
              <p className="card-text">$20,000.00</p>
              <a href="#" className="btn btn-primary">View Details</a>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Recent Transactions</h5>
              <ul className="list-group">
                <li className="list-group-item">Deposit: $1,000.00</li>
                <li className="list-group-item">Withdrawal: $500.00</li>
                <li className="list-group-item">Transfer: -$200.00</li>
              </ul>
              <a href="account" className="btn btn-primary">View All</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;