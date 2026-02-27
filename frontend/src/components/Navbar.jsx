import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = event.target.search.value.trim();
    if (query) {
      navigate(`/marketplace?q=${encodeURIComponent(query)}`);
    } else {
      navigate('/marketplace');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          CodeMart <span>Plus</span>
        </Link>
        <form className="nav-search" onSubmit={handleSearchSubmit}>
          <input name="search" placeholder="Search for projects, code, papers, notes" />
        </form>
        <div className="nav-links">
          {user ? (
            <>
              <Link to="/marketplace">Explore</Link>
              <Link to="/refreshments">Refreshments</Link>
              {user.role === 'SELLER' && <Link to="/seller">Seller</Link>}
              <Link to="/orders">Orders</Link>
              <Link to="/cart">Cart ({cartCount})</Link>
              <Link to="/profile">Profile</Link>
              <span className="role-chip">{user.role}</span>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/marketplace">Explore</Link>
              <Link to="/refreshments">Refreshments</Link>
              <Link to="/cart">Cart ({cartCount})</Link>
              <Link to="/login">Login</Link>
              <Link to="/register" className="register-btn">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
