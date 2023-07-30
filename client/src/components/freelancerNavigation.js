import React from 'react';
import { Link, useHistory } from "react-router-dom";
import '../components/layout/freelancerNavigation.css';



function FreelancerNavigation() {
    const history = useHistory();

  return (
    <header className='freelancerheader'>
        <div>
          <h1 className='freelancerlogo'>FREELANCE</h1>
        </div>
        <nav className='freelancernav'>
          <ul className='freelancerul'>
            
            <li>
              <Link
                to="/browse_employers"
                onClick={() => history.push("/browse_employers")}
              >
                Browse Employers
              </Link>
            </li>
            <li>
              <Link
                to="/browse_all_jobs"
                onClick={() => history.push("/browse_all_jobs")}
              >
                Browse Jobs
              </Link>
            </li>
          </ul>
        </nav>
      </header>
  );
}

export default FreelancerNavigation;
