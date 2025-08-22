// App.js
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './Header';
import About from './pages/About';
import Awards from './pages/Awards';
import Contact from './pages/Contact';
import Winners from './pages/Winners';
import Terms from './pages/Terms';
import Use from './pages/Use';
import Faq from './pages/Faq';
import Message from './pages/Message';
import Rankings from "./pages/Rankings"; 
import Navbar from './components/Navbar';
import PostForm from './components/PostForm';
import Map from './components/Map';
import Profile from './components/Profile'; 
import ScrollToTop from './components/ScrollToTop';
import UserProfile from './components/UserProfile';
import MySuiso from './pages/MySuiso';
import Notifications from './components/Notifications';
import Bonus from './pages/Bonus';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <Router>
      <ScrollToTop />
      <Header onMenuClick={toggleMenu} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/winners" element={<Winners />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/use" element={<Use />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/message" element={<Message />} />
        <Route path="/rankings" element={<Rankings />} /> 
        <Route path="/post" element={<PostForm />} /> 
        <Route path="/map" element={<Map />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/:userId" element={<UserProfile />} />
        <Route path="/mysuiso" element={<MySuiso />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/bonus" element={<Bonus />} />
      </Routes>
      
      <Navbar /> 
    </Router>
  );
}

export default App;

