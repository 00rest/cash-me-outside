import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light" style={{ backgroundColor: "#003366", color: "white" }}>
      <a className="navbar-brand text-white" href="./home" style={{ marginLeft: 15 }}>
        Cash Me Outside
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link text-white" href="getcash">
              Ca$h <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="transfer">
              Wire
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="zelle">
              Zelle
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link text-white"
              href="/"
            >
              Log Out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
