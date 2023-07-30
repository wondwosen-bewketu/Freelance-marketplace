import React, { useState, useEffect } from 'react';
import myImage from "../assets/logo.jpg";
import './dashboard.css'; 
import Employers from '../pages/employers';
import Freelancers from '../pages/freelancers';
import AllJobs from '../pages/alljob';
import Application from '../pages/application';
import Feedback from '../pages/feedback';
import CreateWalletModal from './createWallet';
import axios from 'axios';

const DashboardPage = () => {
  const [activeButton, setActiveButton] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [adminFeePercentage, setAdminFeePercentage] = useState(0);

  useEffect(() => {
    // Fetch the admin fee percentage from the backend
    fetchAdminFeePercentage();
  }, []);

  const fetchAdminFeePercentage = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/admin/fee');
      const { adminFeePercentage } = response.data;
      setAdminFeePercentage(adminFeePercentage);
    
    } catch (error) {
      console.log('Error fetching admin fee:', error);
    }
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    setShowSearchBar(false); // hide search bar when a button is clicked
  };

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('Search value:', searchValue);
  
    if (searchValue.toLowerCase() === 'job') {
      setActiveButton('allJobs');
      setShowSearchBar(false);
    } else if (searchValue.toLowerCase() === 'employers') {
      setActiveButton('employers');
      setShowSearchBar(false);
    } else if (searchValue.toLowerCase() === 'freelancers') {
      setActiveButton('freelancers');
      setShowSearchBar(false);
    } else {
      console.log('No search result found');
      // You can implement the logic to display a message if no search result found
    }
    setSearchValue('');
  };
  
  return (
    <div className="dashboard-container">
      <main className='main'>
        <h2 onClick={() => window.location.reload()} className='dashboard'>Admin</h2>
        <div className="dashboard-header">
          <img src={myImage} alt="Admin" />
        </div>
        <div className="dashboard-user">
          <h3>Wendi</h3>
        </div>

        <div className="dashboard-buttons">
          <button onClick={() => handleButtonClick('employers')} className="button">View Employers</button>
          <button onClick={() => handleButtonClick('freelancers')} className="button">View Freelancers</button>
          <button onClick={() => handleButtonClick('allJobs')} className="button">View All Jobs</button>
        
          <button onClick={() => handleButtonClick('feedbacks')} className="button">View Feedback</button>
        </div>

      

       

      </main>
      <aside>
      {showSearchBar &&  (
          <form onSubmit={handleSearchSubmit} className="search-bar">
            <input 
              type="text" 
              value={searchValue} 
              onChange={handleSearchInputChange} 
              placeholder="Search for something..." 
              className='search'
            />
            <button type="submit">Search</button>
          </form>
        )}
        <div className="dashboard-content">
          {activeButton === 'employers' && <Employers />}
          {activeButton === 'freelancers' && <Freelancers />}
          {activeButton === 'allJobs' && <AllJobs />}
        
          {activeButton === 'feedbacks' && <Feedback />}
        </div>
        </aside>
    </div>
  );
};

export default DashboardPage;
