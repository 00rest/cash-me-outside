import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p className="mb-0">&copy; 2023 Cash Me Outside Bank. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-right">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <a href="/">Home</a>
              </li>
              <li className="list-inline-item">
                <a href="/about">About</a>
              </li>
              <li className="list-inline-item">
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;