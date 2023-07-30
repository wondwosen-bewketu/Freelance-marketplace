import React from 'react';
import { Link, useHistory } from "react-router-dom";
import './profileNavigation.css';


function ProfileNavigation() {
    const history = useHistory();

    const handleLogout = () => {
      localStorage.removeItem("token"); // Clear the token from local storage
      history.push("/login"); // Redirect to the login page
    };

  return (
    <header className='employerheader'>
        <div>
          <h1 className='employerlogo'>Freelance System</h1>
        </div>
        <nav className='employernav'>
          <ul className='employerul'>
            <li>
              <Link
                to="/browse_freelancers"
                onClick={() => history.push("/browse_freelancers")}
              >
                Browse Freelancers
              </Link>
            </li>
            <button onClick={handleLogout} className="logoutbutton">Logout</button>
            <li>
              <Link
                to="/browse_jobs"
                onClick={() => history.push("/browse_jobs")}
              >
                Browse Jobs
              </Link>
            </li>
          </ul>
        </nav>
        
      </header>
  );
}

export default ProfileNavigation;
