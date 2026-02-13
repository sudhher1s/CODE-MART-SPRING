import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../services/api';
import '../styles/Marketplace.css';

const categories = ['ALL', 'WEB_PROJECT', 'MOBILE_APP', 'CODE_SNIPPET', 'NOTES', 'PAPER', 'DESIGN'];

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const searchQuery = searchParams.get('q') || '';

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

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const query = searchQuery.toLowerCase();
      const title = (product.title || '').toLowerCase();
      const description = (product.description || '').toLowerCase();
      const category = (product.category || '').toUpperCase();

      const matchesQuery = !query || title.includes(query) || description.includes(query);
      const matchesCategory = selectedCategory === 'ALL' || category === selectedCategory;

      return matchesQuery && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const handleSearchInput = (event) => {
    const value = event.target.value;
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="marketplace-page">
      <section className="marketplace-header">
        <h1>Student Marketplace</h1>
        <p>Buy and sell ready-to-use codes, projects, papers, notes, and templates.</p>
        <input
          className="marketplace-search"
          placeholder="Search project, code, notes, papers..."
          value={searchQuery}
          onChange={handleSearchInput}
        />
      </section>

      <div className="category-row">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.replace('_', ' ')}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="page-message">Loading products...</div>
      ) : filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="page-message">No products found for this filter.</div>
      )}
    </div>
  );
};

export default Marketplace;
