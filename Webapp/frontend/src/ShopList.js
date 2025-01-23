import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ShopList.css";

const ShopList = () => {
  const [shops, setShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch("http://localhost:82/shops");
        if (!response.ok) {
          throw new Error("Failed to fetch shops.");
        }
        const data = await response.json();
        setShops(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchShops();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login"); // Go to the login page
  };

  const toggleMenu = (e) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  const filteredShops = shops.filter(
    (shop) =>
      shop.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.Location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="shoplistcontainer">
      {/* Menu Button */}
      <button className="hamburgerbutton" onClick={toggleMenu}>
        &#9776;
      </button>

      {/*Header*/}
      <div className="header">
        <h1>Our Shops</h1>
      </div>

      {/* Menu */}
      {isMenuOpen && (
        <div className="menu" onClick={(e) => e.stopPropagation()}>
          <ul>
            <li>
              <button onClick={handleLogin}>Login</button>
            </li>
          </ul>
        </div>
      )}


      {/* Search Bar */}
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search by name or location"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Shops Grid */}
      <div className="shopsgrid">
        {filteredShops.length === 0 ? (
          <p>No shops found.</p>
        ) : (
          filteredShops.map((shop) => (
            <div key={shop._id} className="shopcard">
              <h2>{shop.Name}</h2>
              <p>{shop.Location}</p>
            </div>
          ))
        )}
      </div>

      {/* Login Button */}
      <button onClick={handleLogin} className="loginbutton">
        Login
      </button>
    </div>
  );
};

export default ShopList;
