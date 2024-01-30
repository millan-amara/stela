import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as CarIcon } from '../assets/svg/carIcon.svg';
import { ReactComponent as SearchIcon } from '../assets/svg/searchIcon.svg';
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg';
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg';
import useAuthStatus from '../hooks/useAuthStatus';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAdmin } = useAuthStatus();
  
  const pathMatchRoute = (route) => {
      if(route === location.pathname) {
          return true
      }
  }

  return (
    <footer className="navbar">
        <nav className="navbarNav">
            <ul className="navbarListItems">
                <li className="navbarListItem" onClick={() => navigate('/')}>
                    <ExploreIcon fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'} width='20px' height='20px' />
                    <p className={pathMatchRoute('/') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Home</p>
                </li>
                <li className="navbarListItem" onClick={() => navigate('/cars')}>
                    <SearchIcon fill={pathMatchRoute('/cars') ? '#2c2c2c' : '#8f8f8f'} width='20px' height='20px' />
                    <p className={pathMatchRoute('/cars') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Search</p>
                </li>

                {isAdmin ?
                <>
                <li className="navbarListItem" onClick={() => navigate('/create-listing')}>
                    <CarIcon fill={pathMatchRoute('/create-listing') ? '#2c2c2c' : '#8f8f8f'} width='20px' height='20px' />
                    <p className={pathMatchRoute('/create-listing') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Sell</p>
                </li>
                
                <li className="navbarListItem" onClick={() => navigate('/profile')}>
                    <PersonOutlineIcon fill={pathMatchRoute('/profile') ? '#2c2c2c' : '#8f8f8f'} width='20px' height='20px' />
                    <p className={pathMatchRoute('/profile') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Profile</p>
                </li>
                </> : ''
                } 
                
            </ul>
        </nav>
    </footer>
  )
}

export default Navbar