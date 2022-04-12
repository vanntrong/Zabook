import HomePage from 'pages/home/HomePage';
// import ProfilePage from 'pages/profile/ProfilePage';
// import InformationPage from 'pages/information/InformationPage';
// import FriendsPage from 'pages/friends/FriendsPage';
// import PhotosPage from 'pages/photo/PhotosPage';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './app.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
