// NavbarWrapper.js
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const NavbarWrapper = ({ isAuthenticated }) => {
  const location = useLocation();

  // Check if the current path is login or signup
  if (isAuthenticated && !['/login', '/signup'].includes(location.pathname)) {
    return <Navbar />;
  }

  return null;
};

export default NavbarWrapper;
