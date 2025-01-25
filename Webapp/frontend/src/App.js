import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShopList from './ShopList';
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShopList />} /> {/* Default page is the shops one */}
        <Route path="/login" element={<Login />} /> {/* Login page */}
        <Route path="/register" element={<Register />} /> {/* Registeration page */}
        <Route path="/profile" element={<Profile />} /> {/* Profile page */}
      </Routes>
    </Router>
  );
};

export default App;
