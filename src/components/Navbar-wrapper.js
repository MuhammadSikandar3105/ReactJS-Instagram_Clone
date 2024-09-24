// NavbarWrapper.js
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Mobilenavbar from './Mobilenavbar';

const NavbarWrapper = ({ isAuthenticated }) => {
  const location = useLocation();

  // Check if the current path is login or signup
  if (isAuthenticated && !['/login', '/signup'].includes(location.pathname)) {
    return <Navbar /> || Mobilenavbar;
  }

  return null;
};

export default NavbarWrapper;
