import React from 'react';
import { Link } from 'react-router-dom';

const LoggedOut = () => {
  return (
    <>
      <Link to="/login" className="btn btn-outline btn-primary mr-2">Login</Link>
      <Link to="/register" className="btn btn-primary">Register</Link>
    </>
  );
}

export default LoggedOut;
