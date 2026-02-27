import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { orderAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/Orders.css';

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const fetchOrders = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response =
        user.role === 'SELLER'
          ? await orderAPI.getOrdersBySeller(user.id)
          : await orderAPI.getOrdersByBuyer(user.id);
      setOrders(response.data || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.id, user?.role]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders, location.pathname]);

  useEffect(() => {
    const handleFocus = () => {
      fetchOrders();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [fetchOrders]);

  if (!user) {
    return (
      <div className="orders-page">
        <div className="orders-empty">Please <Link to="/login">login</Link> to view orders.</div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h2>{user.role === 'SELLER' ? 'Sales Orders' : 'My Orders'}</h2>
      {loading ? (
        <div className="orders-empty">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="orders-empty">No orders yet.</div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div>
                <h4>{order.product?.title || 'Product'}</h4>
                <p>Order ID: #{order.id}</p>
                <p>Placed: {new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <div className="order-right">
                <strong>₹{order.price}</strong>
                <span className={`status ${String(order.status || '').toLowerCase()}`}>{order.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
