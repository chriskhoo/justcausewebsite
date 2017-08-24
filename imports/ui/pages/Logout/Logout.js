import React from 'react';
import { Link } from 'react-router-dom';

import './Logout.scss';

const Logout = () => (
  <div className="Logout">
    <h1>You are logged out</h1>
    <p>Click <Link to="/login">here</Link> to log in</p>
  </div>
);

Logout.propTypes = {};

export default Logout;
