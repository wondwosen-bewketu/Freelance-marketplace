import { Link, useLocation } from "react-router-dom";
import classes from './MainNavigation.module.css';
import myImage from "./logo2.png";
import { useState } from 'react';

function MainNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenuHandler = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  let logo =  <Link to='/' className={classes.logo}>FREELANCE</Link>

  if (location.pathname === '/Login' || location.pathname === '/Register' || location.pathname === '/About' || location.pathname === '/FAQ') {
    logo =  <Link to='/' className={classes.logo}>FREELANCE</Link>
  }

  return (
    <header className={classes.header}>
      {logo}
      {(location.pathname === '/') && (
        <nav className={`${classes.nav} ${isMenuOpen ? classes.show : ''}`}>
          <ul>
            <li>
              <Link to='/' onClick={toggleMenuHandler}>Home</Link>
            </li>
            <li>
              <Link to='/Register' onClick={toggleMenuHandler}>Register</Link>
            </li>
            <li>
              <Link to='/Login' onClick={toggleMenuHandler}>Login</Link>
            </li>
            <li>
              <Link to='/About' onClick={toggleMenuHandler}>About</Link>
            </li>
            <li>
              <Link to='/FAQ' onClick={toggleMenuHandler}>FAQ</Link>
            </li>
          </ul>
        </nav>
      )}
      <div className={`${classes.burger} ${isMenuOpen ? classes.open : ''}`} onClick={toggleMenuHandler}>
        <div className={classes.line}></div>
        <div className={classes.line}></div>
        <div className={classes.line}></div>
      </div>
    </header>
  );
}

export default MainNavigation;
