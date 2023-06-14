import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';

const AccountActivity = () => {
  // Simulated account activity data
  const checking = [
    { id: 1, date: '2023-06-01', description: 'Deposit', amount: 1000 },
    { id: 2, date: '2023-06-02', description: 'Withdrawal', amount: -500 },
    { id: 3, date: '2023-06-03', description: 'Transfer', amount: -200 },
    { id: 4, date: '2023-06-04', description: 'Deposit', amount: 1500 },
  ];

  // const saving = [
  //   { id: 1, date: '2023-06-01', description: 'Deposit', amount: 1000 },
  //   { id: 2, date: '2023-06-02', description: 'Withdrawal', amount: -500 },
  //   { id: 3, date: '2023-06-03', description: 'Transfer', amount: -200 },
  //   { id: 4, date: '2023-06-04', description: 'Deposit', amount: 1500 },
  // ];

  // Actual data :)
  const location = useLocation();
  const accData = location.state.account;
  console.log(accData);

  if (!accData.transactions) {
    return (

        <div className="container mt-5 d-flex-column min-vh-100">
          <h1 className="mb-4">Account Activity ({accData.accountType} - {accData._id})</h1>

          <h3 style={{ text: "center" }}>No activity found</h3>
          <img alt={"Loser"} src={'./images/trump.jpg'} />

  
        </div>
      );
    
  } 
  else {

    return (
      <div className="container mt-5 d-flex-column min-vh-100">
        <h1 className="mb-4">Account Activity ({accData.accountType} - {accData._id})</h1>
        {
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
          </table>}

      </div>
    );
  };
};
export default AccountActivity;