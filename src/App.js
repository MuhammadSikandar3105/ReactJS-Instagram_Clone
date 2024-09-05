import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Explore from './components/Explore';
import Search from './components/Search';
import Reels from './components/Reels';
import Messages from './components/Messages';
import Notification from './components/Notification';
import Profile from './components/Profile';
import Create from './components/Create';
import More from './components/More';


function App() {
  return (
    <>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create" element={<Create />} />
            <Route path="/more" element={<More />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
