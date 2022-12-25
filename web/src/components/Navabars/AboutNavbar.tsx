import React from 'react';
import { Link } from 'react-router-dom';

export const AboutNavbar = () => {
  return (
    // navbar with react router <Link> components
    <nav className="Nav about-navbar">
      <div
        style={{ display: 'flex', justifyContent: 'flex-end', color: 'white' }}
      >
        <Link to="/" className="Nav__brand"></Link>

        <div className="Nav__right">
          <Link className="Nav__link mx-2" to="/Analysis">
            Analysis
          </Link>

          <Link className="Nav__link mx-2" to="/About">
            About
          </Link>

          <Link className="Nav__link mx-2" to="/">
            Progress
          </Link>
        </div>
      </div>
    </nav>
  );
};
