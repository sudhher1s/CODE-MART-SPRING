import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/SellerDashboard.css';

const initialForm = {
  title: '',
  description: '',
  category: 'WEB_PROJECT',
  price: '',
  language: '',
  difficulty: 'BEGINNER',
  features: '',
  previewUrl: '',
};

const SellerDashboard = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(initialForm);
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadSellerProducts = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    try {
      const response = await productAPI.getProductsBySeller(user.id);
      setMyProducts(response.data || []);
    } catch (err) {
      console.error('Failed to load seller products:', err);
      setError('Unable to load your products.');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadSellerProducts();
  }, [loadSellerProducts]);

  const summary = useMemo(() => {
    const totalProducts = myProducts.length;
    const totalDownloads = myProducts.reduce((sum, product) => sum + (product.downloads || 0), 0);
    const avgRating =
      totalProducts > 0
        ? (
            myProducts.reduce((sum, product) => sum + Number(product.rating || 0), 0) / totalProducts
          ).toFixed(1)
        : '0.0';

    return { totalProducts, totalDownloads, avgRating };
  }, [myProducts]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!user?.id || user.role !== 'SELLER') {
      setError('Only sellers can upload products.');
      return;
    }

    if (!formData.title || !formData.price || !formData.category) {
      setError('Title, category, and price are required.');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
      };
      await productAPI.createProduct(payload, user.id);
      setFormData(initialForm);
      await loadSellerProducts();
    } catch (err) {
      console.error('Failed to upload product:', err);
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!user?.id) {
      return;
    }
    try {
      await productAPI.deleteProduct(productId, user.id);
      await loadSellerProducts();
    } catch (err) {
      console.error('Failed to delete product:', err);
      setError('Delete failed.');
    }
  };

  if (!user) {
    return (
      <div className="seller-page">
        <div className="seller-empty">Please <Link to="/login">login</Link> as seller to manage products.</div>
      </div>
    );
  }

  if (user.role !== 'SELLER') {
    return (
      <div className="seller-page">
        <div className="seller-empty">This page is only for sellers. Switch to a seller account.</div>
      </div>
    );
  }

  return (
    <div className="seller-page">
      <section className="seller-summary">
        <div className="summary-card"><h3>{summary.totalProducts}</h3><p>Uploaded Products</p></div>
        <div className="summary-card"><h3>{summary.totalDownloads}</h3><p>Total Downloads</p></div>
        <div className="summary-card"><h3>{summary.avgRating}</h3><p>Average Rating</p></div>
      </section>

      <section className="seller-panel">
        <h2>Upload New Product</h2>
        {error && <div className="seller-error">{error}</div>}
        <form className="seller-form" onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} rows={3} />

          <div className="row-3">
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="WEB_PROJECT">Web Project</option>
              <option value="MOBILE_APP">Mobile App</option>
              <option value="CODE_SNIPPET">Code Snippet</option>
              <option value="NOTES">Notes</option>
              <option value="PAPER">Paper</option>
              <option value="DESIGN">Design</option>
            </select>
            <input name="price" type="number" step="0.01" placeholder="Price" value={formData.price} onChange={handleChange} required />
            <input name="language" placeholder="Language" value={formData.language} onChange={handleChange} />
          </div>

          <div className="row-2">
            <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
            </select>
            <input name="previewUrl" placeholder="Preview URL" value={formData.previewUrl} onChange={handleChange} />
          </div>

          <textarea name="features" placeholder="Features (comma separated)" value={formData.features} onChange={handleChange} rows={2} />

          <button type="submit" disabled={saving}>{saving ? 'Uploading...' : 'Upload Product'}</button>
        </form>
      </section>

      <section className="seller-list">
        <h2>My Uploaded Products</h2>
        {loading ? (
          <div className="seller-empty">Loading products...</div>
        ) : myProducts.length === 0 ? (
          <div className="seller-empty">No uploaded products yet.</div>
        ) : (
          <div className="seller-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Downloads</th>
                  <th>Rating</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {myProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.title}</td>
                    <td>{product.category}</td>
                    <td>₹{product.price}</td>
                    <td>{product.downloads || 0}</td>
                    <td>{product.rating || 0}</td>
                    <td>
                      <button className="danger" onClick={() => handleDelete(product.id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default SellerDashboard;
