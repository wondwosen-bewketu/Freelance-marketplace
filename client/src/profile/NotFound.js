import React from 'react';
import './NotFound.css';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  };

  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">404 - Page Not Found</h1>
      <p className="not-found-text">The page you are looking for does not exist.</p>
      <button onClick={handleClick} className='button'>Go Back</button>
    </div>
  );
};

export default NotFound;
