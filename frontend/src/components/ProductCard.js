import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div className="product-header">
        <h3>{product.title}</h3>
        <span className="price">₹{product.price}</span>
      </div>
      <p className="description">{product.description?.substring(0, 100)}...</p>
      <div className="product-meta">
        <span className="category">{product.category}</span>
        <span className="language">{product.language || 'GENERAL'}</span>
        <span className="difficulty">{product.difficulty || 'NA'}</span>
      </div>
      <div className="product-footer">
        <span>{product.downloads} downloads</span>
        <span>⭐ {product.rating}</span>
      </div>
      <div className="product-actions">
        <Link to={`/product/${product.id}`} className="view-link">View Details</Link>
        <button onClick={() => addToCart(product)} className="cart-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
