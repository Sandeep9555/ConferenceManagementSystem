import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Optional: Add custom styles for the navbar

const Navbar = ({ isAdmin }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Conference Management System</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/conferences">Conferences</Link>
        </li>
        <li>
          <Link to="/feedback">Feedback</Link>
        </li>
        {!isAdmin ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/admin/conferences">Manage Conferences</Link>
            </li>
            <li>
              <Link to="/admin/registrations">Manage Registrations</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
