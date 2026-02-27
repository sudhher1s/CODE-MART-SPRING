import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import '../styles/Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await productAPI.getAllProducts();
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, location.pathname]);

  useEffect(() => {
    const handleFocus = () => {
      fetchProducts();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [fetchProducts]);

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-text">
          <h1>Build. Sell. Learn. Grow.</h1>
          <p>
            A student-first ecommerce platform to buy and sell source codes, mini/major projects,
            notes, papers, and tech resources.
          </p>
          <div className="hero-actions">
            <Link to="/marketplace" className="primary-btn">Start Shopping</Link>
            <Link to="/seller" className="secondary-btn">Start Selling</Link>
          </div>
        </div>
        <div className="hero-badge-panel">
          <div className="badge-card"><strong>100%</strong><span>Student Focused</span></div>
          <div className="badge-card"><strong>Fast</strong><span>Digital Delivery</span></div>
          <div className="badge-card"><strong>Safe</strong><span>Trusted Transactions</span></div>
        </div>
      </section>

      <section className="category-strip">
        <div>Web Projects</div>
        <div>Mobile Apps</div>
        <div>Code Snippets</div>
        <div>Papers</div>
        <div>Notes</div>
        <div>Design Kits</div>
      </section>

      <section className="featured-section">
        <div className="section-head">
          <h2>Trending Products</h2>
          <Link to="/marketplace">View all</Link>
        </div>
        {loading ? (
          <div className="loading-box">Loading featured products...</div>
        ) : (
          <div className="products-container">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
