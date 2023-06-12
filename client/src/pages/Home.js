import React from 'react';
import { useLazyQuery } from "@apollo/client";
import { GET_USER_BY_ID } from '../utils/queries';
import { Link } from '@react-navigation/native';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  let userID;

  const [getUser, { loading, error, data }] = useLazyQuery(GET_USER_BY_ID);
  const userData = data?.user || [];
  console.log(userData);

  if (error) console.log(error);

  return (
    <div className="container mt-5 d-flex-column min-vh-100">
      <h1 className="mb-4">Welcome to Cash Me Outsite Bank</h1>

      <div>
        <form onSubmit={e => {
          e.preventDefault();
          getUser({ variables: { id: userID.value } });
        }}>
          <label htmlFor="userID">Enter user ID:
            <br />
            <input ref={value => userID = value} />
          </label>
          <br />
          <button type="submit">Get User</button>
        </form>
      </div>

      <p>View your account balance and recent transactions.</p>
      <div className="row">
        <div className="col-md-6">
          {loading
            ? (<div>Loading...</div>)
            : (
              <div>
                <ul style={{ listStyle: 'none' }}>
                  <li>{userData._id}</li>
                  <li>{userData.name}</li>
                  <li>{userData.email}</li>
                  <li>{userData.ssn}</li>
                </ul>

                {userData.accounts &&
                  <div>
                    {userData.accounts.map((x) => (
                      <div className="card" key={x._id} style={{ marginBottom: 10 }}>
                        <div className="card-body" >
                          <h5 className="card-title">{x.accountType} Account Balance</h5>
                          <p className="card-text">${x.balance}</p>
                          <a href="/account" className="btn btn-primary">View Details</a>
                          <Link to={{ screen: 'Accounts', params: { id: 'jane' } }}>
                            Go to Jane's profile
                          </Link>
                        </div>
                      </div>

                    ))
                    }
                  </div>
                }
              </div>)
          }
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