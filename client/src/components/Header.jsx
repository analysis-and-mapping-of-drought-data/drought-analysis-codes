import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const navLinkStyle = {
    textDecoration: "none",
  };

  return (
    <div>
      {/* Navbar Start */}
      <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
        <Link to="/" className="navbar-brand mx-auto" style={navLinkStyle}>
          <div className="rounded-pill p-2 border border-secondary">
            <span className="bi bi-house-door text-primary me-2"></span>
            <span className="text-primary">Home</span>
          </div>
        </Link>

        <Link to="/baraj" className="navbar-brand mx-auto" style={navLinkStyle}>
          <div className="rounded-pill p-2 border border-secondary">
            <span className="bi bi-droplet text-primary me-2"></span>
            <span className="text-primary">Baraj</span>
          </div>
        </Link>

        <Link to="/sulama" className="navbar-brand mx-auto" style={navLinkStyle}>
          <div className="rounded-pill p-2 border border-secondary">
            <span className="bi bi-irrigation text-primary me-2"></span>
            <span className="text-primary">Sulama Verileri</span>
          </div>
        </Link>

        
          

          <div className="nav-item">
            <div className="rounded-pill  p-2 d-flex align-items-center text-danger border border-danger">
              <div className="rounded-circle overflow-hidden me-2">
                <img className="rounded-circle" src="img/sirket.jpg" alt="" style={{ width: 40, height: 40 }} />
              </div>
              <span className="d-none d-lg-inline-flex">ISS</span>
            </div>
          </div>
        
      </nav>
      {/* Navbar End */}
    </div>
  );
}

export default Header;
