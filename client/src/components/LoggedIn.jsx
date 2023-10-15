import React, { useContext } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoggedIn = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleClick = () => {
    axios.post("http://localhost:8000/api/logout", {}, { withCredentials: true })
      .then((userData) => {
        console.log(userData);
        dispatch({type: "LOGOUT"});
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <ul className="menu menu-horizontal px-1">
        <li><a>Competitions</a></li>
        <li>
          <details>
            <summary>
              Team
            </summary>
            <ul className="p-2 bg-base-100">
              <li><a>Squad</a></li>
              <li><a>Training</a></li>
              <li><a>Finances</a></li>
            </ul>
          </details>
        </li>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="/images/business-man-profile-vector.jpg" />
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li onClick={handleClick}><span>Logout</span></li>
          </ul>
        </div>
      </ul>
    </>
  );
}

export default LoggedIn;
