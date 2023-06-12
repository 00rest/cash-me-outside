import React from 'react';
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_USER_BY_ID} from '../utils/queries';
import 'bootstrap/dist/css/bootstrap.min.css';
import auth from '../utils/auth';

const HomePage = () => {
  //let userID;

  const session = auth.getSession();
  console.log(session);

  //const [getUser, { loading, error, data }] = useLazyQuery(GET_USER_BY_ID);
  const { loading, data, error } = useQuery(GET_USER_BY_ID, {
    variables: { id: session.userId }
  });
  const userData = data?.userById || [];
  console.log("userData", userData);

  if (error) console.log(error);

  return (
    <div className="container mt-5 d-flex-column min-vh-100">
      <h1 className="mb-4">Welcome, {userData.name}</h1>

      {/* <div>
        <form onSubmit={e => {
          e.preventDefault();
          getUser({ variables: { id: userID.value } });
        }}>
          <label htmlFor="userID">Enter user ID:
            <br />
            <input ref={value => userID = value} />
          </label>
          <br />
          <button type="submit">Get accounts</button>
        </form>
      </div> */}

      <p>View your account balance and recent transactions.</p>
      <div className="row">
        <div className="col-md-8">
          {loading
            ? (<div>Loading...</div>)
            : (
              <div>
                {/* <ul style={{ listStyle: 'none' }}>
                  <li>Account# {userData._id}</li>
                  <li>email: {userData.email}</li>

                </ul> */}

                {userData.accounts &&
                  <div>
                    {userData.accounts.map((x) => (
                      <div className="card" key={x._id} style={{ marginBottom: 10 }}>
                        <div className="card-body" >
                          <h5 className="card-title">{x.accountType} Account</h5>
                          <p className="card-text">Balance ${x.balance}</p>
                          <a href="/accountactivity" className="btn btn-primary">
                            View Details
                            </a>

                        </div>
                      </div>

                    ))
                    }
                  </div>
                }
              </div>)
          }
        </div>
        <div className="col-md-4">
          <div className="card" style={{ marginBottom: 10 }}>
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


          <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-body">
              <h5 className="card-title">Get our latest credit line</h5>
              <h6>If you love being in debt, dont be shy and APPLY!</h6>
              <a href="account" className="btn btn-primary">View All</a>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default HomePage;