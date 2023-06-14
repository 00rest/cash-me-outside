import React, { useState } from "react"
import { useMutation } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ADD_ACCOUNT } from '../utils/mutations';
import auth from "../utils/auth";

export function NewAccount() {
  const [formState, setFormState] = useState({ id: auth.getSession().userId, accountType: 'Checking', startingBalance: 0 });
  const [addAccount, { error }] = useMutation(ADD_ACCOUNT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addAccount({
        variables: {
          id: auth.getSession().userId,
          accountType: formState.accountType,
          balance: parseFloat(formState.startingBalance || 0)
        },
      });

      console.log("res: ", mutationResponse.data);

      window.location.assign('/home');
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  if (error) console.log(error);

  return (
    <div className="container mt-5 d-flex-column min-vh-100">

      <div className="col-md-4">
        <div className="card" style={{ marginBottom: 10 }}>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <div>
                <h3>New Account</h3>
                <div className="form-group mt-3">
                  <label style={{ marginRight: '2ch' }}>Account Type</label>
                  <label style={{ marginRight: '2ch' }}>
                    <input style={{ marginRight: '1ch' }} type="radio" value="Checking" name="accountType" id="accountType" checked={formState.accountType === 'Checking'} onChange={handleChange} />
                    Checking
                  </label>
                  <label>
                    <input style={{ marginRight: '1ch' }} type="radio" value="Savings" name="accountType" id="accountType" checked={formState.accountType === 'Savings'} onChange={handleChange} />
                    Savings
                  </label>
                </div>
                <div className="form-group mt-3">
                  <label>Initial Deposit</label>
                  <input
                    prefix="$"
                    type="number"
                    name="startingBalance"
                    id="startingBalance"
                    onChange={handleChange}
                    className="form-control mt-1"
                    placeholder="$ ###"
                  />
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAccount;