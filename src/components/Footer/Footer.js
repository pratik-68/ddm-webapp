import React from 'react';
import { Link } from 'react-router-dom';
import { DASHBOARD_ROUTE } from '../../constants/route-constants';

const footer = () => {
  return (
    <footer className="bg-dark">
      <div className="container p-2 d-flex justify-content-between">
        <ul className="text-uppercase">
          <li className="d-inline">
            <Link className="text-light" to={DASHBOARD_ROUTE} title="Home">
              Home
            </Link>
          </li>
        </ul>
        <small className="text-light pt-2">
          &copy; 2020 DDM. All right reserved.
        </small>
      </div>
    </footer>
  );
};

export default footer;
