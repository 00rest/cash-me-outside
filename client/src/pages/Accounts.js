import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AccountActivity = () => {
  // Simulated account activity data
  const checking = [
    { id: 1, date: '2023-06-01', description: 'Deposit', amount: 1000 },
    { id: 2, date: '2023-06-02', description: 'Withdrawal', amount: -500 },
    { id: 3, date: '2023-06-03', description: 'Transfer', amount: -200 },
    { id: 4, date: '2023-06-04', description: 'Deposit', amount: 1500 },
  ];

  const saving = [
    { id: 1, date: '2023-06-01', description: 'Deposit', amount: 1000 },
    { id: 2, date: '2023-06-02', description: 'Withdrawal', amount: -500 },
    { id: 3, date: '2023-06-03', description: 'Transfer', amount: -200 },
    { id: 4, date: '2023-06-04', description: 'Deposit', amount: 1500 },
  ];

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Account Activity (Checking)</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {checking.map((activity) => (
            <tr key={activity.id}>
              <td>{activity.date}</td>
              <td>{activity.description}</td>
              <td>{activity.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <h1 className="mb-4">Account Activity (Saving)</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {saving.map((activity) => (
            <tr key={activity.id}>
              <td>{activity.date}</td>
              <td>{activity.description}</td>
              <td>{activity.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountActivity;