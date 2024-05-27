import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBooks from './components/SearchBooks';
import UserProfile from './components/UserProfile';
import NavigationBar from './components/NavigationBar'; 

function App() {
  return (
    <Router>
      <NavigationBar /> {}
      <Routes>
        <Route path="/" element={<SearchBooks />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
