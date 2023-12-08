// Navbar.jsx

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Your App Name
        </Link>
        {/* Add other navbar items as needed */}
      </div>
    </nav>
  );
};

export default Navbar;
