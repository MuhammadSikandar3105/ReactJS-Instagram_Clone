import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useState, useEffect } from 'react';
import NavbarWrapper from './components/Navbar-wrapper';
import Home from './components/Home';
import Explore from './components/Explore';
import Reels from './components/Reels';
import Profile from './components/Profile';
import Create from './components/Create';
import More from './components/More';
import PostModal from './components/PostModal';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute'; 
import Message from './components/Message';
import Storymodal from './components/Storymodal';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    // Listen for changes in localStorage
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);


  return (
    <Router>
      <div>
        <NavbarWrapper 
          isAuthenticated={isAuthenticated}
        />
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/explore" element={<PrivateRoute><Explore /></PrivateRoute>} />
          <Route path="/reels" element={<PrivateRoute><Reels /></PrivateRoute>} />
          <Route path='/message' element={<PrivateRoute><Message /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/create" element={<PrivateRoute><Create /></PrivateRoute>} />
        </Routes>
         <PostModal />
         <More />
         <Storymodal />
      </div>
    </Router>
  );
  
}

export default App;
