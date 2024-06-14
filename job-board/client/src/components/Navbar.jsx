import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import AuthContext from "../context/AuthContext";

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const loggedOutUser = logout();
    alert(`Logged out: ${loggedOutUser}`);
    navigate('/'); // Redirect to home or login page after logout
  };
  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/">Job Board</NavLink>
          </div>

          <nav>
            <ul>
              <li>
                <NavLink to="/"> Home </NavLink>
              </li>
              <li>
                <NavLink to="/about"> About </NavLink>
              </li>
              <li>
                <NavLink to="/contact"> Contact </NavLink>
              </li>
              {!user && (
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              )}
              {!user && (
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              )}
              {user && (
                <li>
                  <NavLink to="/jobList">Jobs</NavLink>
                </li>
              )}
              {user && (
                <li>
                  <NavLink to="/employer">Employer Dashboard</NavLink>
                </li>
              )}
              {/* {user && (
                <li>
                  <NavLink to="/candidate">Candidate Dashboard</NavLink>
                </li>
              )} */}
              {user && (
                <li>
                  <NavLink onClick={handleLogout}>Logout</NavLink>
                </li>
              )}

              {/* <li>
                <NavLink to="/candidate"> Candidate </NavLink>
              </li>
              <li>
                <NavLink to="/employer"> Employee </NavLink>
              </li>
              
              <li>
                <NavLink to="/register"> Register </NavLink>
              </li>
              <li>
                <NavLink to="/login"> Login </NavLink>
              </li>
              <li>
                <NavLink to="/jobList"> Job </NavLink>
              </li> */}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
