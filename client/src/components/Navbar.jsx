import React, { useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import LoggedOut from './LoggedOut';
import LoggedIn from './LoggedIn';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { isLoggedIn } = state;
  return (
    <div className="navbar bg-base-100 fixed top-0 left-0 right-0 z-10">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">Super Soccer Manager</Link>
      </div>
      <div className="flex-none">
        {isLoggedIn ? <LoggedIn /> : <LoggedOut />}
      </div>
    </div>
  );
}

export default Navbar;
