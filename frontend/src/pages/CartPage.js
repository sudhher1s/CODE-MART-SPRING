import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';
import '../styles/Cart.css';

const CartPage = () => {
  const { items, addToCart, decreaseQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const { user } = useAuth();
  const [placingOrder, setPlacingOrder] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.role === 'SELLER') {
      setMessage('Seller account cannot buy products. Please login as student.');
      return;
    }

    if (items.length === 0) {
      return;
    }

    setPlacingOrder(true);
    setMessage('');

    try {
      const requests = [];
      items.forEach((item) => {
        for (let qty = 0; qty < item.quantity; qty += 1) {
          requests.push(orderAPI.createOrder(user.id, item.id));
        }
      });

      await Promise.all(requests);
      clearCart();
      setMessage('Order placed successfully!');
      setTimeout(() => navigate('/orders'), 800);
    } catch (error) {
      console.error('Checkout failed:', error);
      setMessage('Checkout failed. Please try again.');
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-left">
        <h2>My Cart ({items.length} items)</h2>
        {items.length === 0 ? (
          <div className="cart-empty">
            Cart is empty. <Link to="/marketplace">Browse marketplace</Link>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-content">
                <h4>{item.title}</h4>
                <p>{item.category} • {item.language || 'General'}</p>
                <strong>₹{item.price}</strong>
              </div>
              <div className="qty-controls">
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => addToCart(item)}>+</button>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))
        )}
      </div>

      <aside className="cart-right">
        <h3>Price Details</h3>
        <div className="price-row"><span>Total</span><strong>₹{cartTotal.toFixed(2)}</strong></div>
        <button onClick={handleCheckout} disabled={placingOrder || items.length === 0}>
          {placingOrder ? 'Placing Order...' : 'Place Order'}
        </button>
        {!!message && <p className="cart-message">{message}</p>}
      </aside>
    </div>
  );
};

export default CartPage;
