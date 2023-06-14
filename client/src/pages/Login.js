import React, { useState } from "react"
import { useMutation } from '@apollo/client';
import { LOGIN, SIGNUP } from '../utils/mutations';
import Auth from '../utils/auth';

export default function Login(props) {
  let [authMode, setAuthMode] = useState("signin")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const [formState, setFormState] = useState({ email: '', password: '', fullName: '', ssn: '' });
  const [login, { error }] = useMutation(LOGIN);
  const [signup, { suErr }] = useMutation(SIGNUP);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if(authMode === 'signin') {
        const mutationResponse = await login({
          variables: { email: formState.email, password: formState.password },
        });
        const token = mutationResponse.data.login.token;
        const name = mutationResponse.data.login.user.name;
        const uId = mutationResponse.data.login.user._id;
        
        console.log("res: ", mutationResponse.data);

        Auth.login(token, uId, name);
      } else {
        // console.log(formState);

        const mutationResponse = await signup({
          variables: { 
            email: formState.email, 
            password: formState.password,
            name: formState.fullName, 
            ssn: parseInt(formState.ssn || "0")
        
          },
        });
        const token = mutationResponse.data.addUser.token;
        const name = mutationResponse.data.addUser.user.name;
        const uId = mutationResponse.data.addUser.user._id
        
        console.log("res: ", mutationResponse.data);
        // console.log("token: ", token);
        
        Auth.login(token, uId, name);
      }
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

  if (authMode === "signin") {
    return (

      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleFormSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Login</h3>
            <div className="text-center">
              New user? {" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                name="email"
                type="email"
                id="email"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={handleChange}
              />
            </div>
            {error ? (
              <div>
                <p className="error-text">The provided credentials are incorrect</p>
              </div>
            ) : null}
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleFormSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              onChange={handleChange}
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
            />
          </div>
          <div className="form-group mt-3">
            <label>SSN</label>
            <input
              type="number"
              name="ssn"
              id="ssn"
              onChange={handleChange}
              className="form-control mt-1"
              placeholder="XXX-XXX-XXXX"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  )
}