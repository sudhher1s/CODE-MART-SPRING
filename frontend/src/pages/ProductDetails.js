import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productAPI.getProduct(id);
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="details-message">Loading product...</div>;
  }

  if (!product) {
    return <div className="details-message">Product not found.</div>;
  }

  return (
    <div className="details-page">
      <Link to="/marketplace" className="back-link">← Back to marketplace</Link>
      <div className="details-card">
        <div>
          <h1>{product.title}</h1>
          <p className="desc">{product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Language:</strong> {product.language || 'General'}</p>
          <p><strong>Difficulty:</strong> {product.difficulty || 'N/A'}</p>
          {product.features && <p><strong>Features:</strong> {product.features}</p>}
        </div>
        <aside className="details-buy">
          <h2>₹{product.price}</h2>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
          {product.previewUrl && (
            <a href={product.previewUrl} target="_blank" rel="noreferrer">
              View Preview
            </a>
          )}
          <div className="meta">Downloads: {product.downloads || 0}</div>
          <div className="meta">Rating: ⭐ {product.rating || 0}</div>
        </aside>
      </div>
    </div>
  );
};

export default ProductDetails;
