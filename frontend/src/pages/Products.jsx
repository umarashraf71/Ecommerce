import React, { useEffect, useState } from "react";
import publicApi from "../utils/publicApi.js";
import { useCart } from "../context/CartContext.jsx";

function Products() {
  const { addToCart, printCartItems } = useCart();

  // Products from API
  const [products, setProducts] = useState([]);

  // Page states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(200);
  const [minRating, setMinRating] = useState(0);
  const [sortOption, setSortOption] = useState("default");

  // Mobile filter
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // =====================================================
  // FETCH PRODUCTS
  // =====================================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await publicApi.get("/public/getProducts");

        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          setError("Failed to load products.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // =====================================================
  // GET UNIQUE CATEGORIES
  // =====================================================

  const categories = [
    ...new Map(
      products
        .filter((product) => product.category)
        .map((product) => [
          product.category._id,
          product.category,
        ])
    ).values(),
  ];

  // =====================================================
  // FILTER + SORT PRODUCTS
  // =====================================================

  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory === "All") {
        return true;
      }

      return product.category?._id === selectedCategory;
    })
    .filter((product) => product.price <= maxPrice)
    .filter((product) => product.rating >= minRating)
    .sort((a, b) => {
      if (sortOption === "price-low") {
        return a.price - b.price;
      }

      if (sortOption === "price-high") {
        return b.price - a.price;
      }

      if (sortOption === "rating") {
        return b.rating - a.rating;
      }

      return 0;
    });

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const clearFilters = () => {
    setSelectedCategory("All");
    setMaxPrice(200);
    setMinRating(0);
    setSortOption("default");
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="products-page">
        <section className="products-page-header">
          <div className="products-header-content">
            <p className="section-subtitle">OUR COLLECTION</p>

            <h1>All Products</h1>

            <p>
              Discover our carefully selected collection of
              quality products.
            </p>
          </div>
        </section>

        <section className="products-page-section">
          <div className="products-loading">
            <h2>Loading Products...</h2>
          </div>
        </section>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="products-page">
        <section className="products-page-header">
          <div className="products-header-content">
            <p className="section-subtitle">OUR COLLECTION</p>

            <h1>All Products</h1>
          </div>
        </section>

        <section className="products-page-section">
          <div className="no-products">
            <div className="no-products-icon">⚠️</div>

            <h2>Unable to Load Products</h2>

            <p>{error}</p>

            <button onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        </section>
      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="products-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="products-page-header">
        <div className="products-header-content">

          <p className="section-subtitle">
            OUR COLLECTION
          </p>

          <h1>All Products</h1>

          <p>
            Discover our carefully selected collection of
            quality products.
          </p>

        </div>
      </section>

      {/* =====================================================
          PRODUCTS CONTENT
      ===================================================== */}

      <section className="products-page-section">

        <div className="products-layout">

          {/* =================================================
              FILTER SIDEBAR
          ================================================= */}

          <aside
            className={`filter-sidebar ${
              mobileFilterOpen ? "filter-open" : ""
            }`}
          >

            <div className="filter-header">

              <h2>Filters</h2>

              <button
                className="filter-close"
                onClick={() => setMobileFilterOpen(false)}
              >
                ×
              </button>

            </div>

            {/* CATEGORY */}

            <div className="filter-group">

              <h3>Categories</h3>

              {/* ALL PRODUCTS */}

              <label className="filter-option">

                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === "All"}
                  onChange={() => setSelectedCategory("All")}
                />

                <span>All Products</span>

              </label>

              {/* DYNAMIC CATEGORIES */}

              {categories.map((category) => (
                <label
                  className="filter-option"
                  key={category._id}
                >

                  <input
                    type="radio"
                    name="category"
                    checked={
                      selectedCategory === category._id
                    }
                    onChange={() =>
                      setSelectedCategory(category._id)
                    }
                  />

                  <span>{category.name}</span>

                </label>
              ))}

            </div>

            {/* PRICE */}

            <div className="filter-group">

              <h3>Maximum Price</h3>

              <div className="price-range-value">

                <span>$0</span>

                <strong>
                  ${maxPrice}
                </strong>

              </div>

              <input
                type="range"
                min="0"
                max="200"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(Number(e.target.value))
                }
                className="price-range"
              />

            </div>

            {/* RATING */}

            <div className="filter-group">

              <h3>Minimum Rating</h3>

              <label className="filter-option">

                <input
                  type="radio"
                  name="rating"
                  checked={minRating === 0}
                  onChange={() => setMinRating(0)}
                />

                <span>All Ratings</span>

              </label>

              <label className="filter-option">

                <input
                  type="radio"
                  name="rating"
                  checked={minRating === 4}
                  onChange={() => setMinRating(4)}
                />

                <span>★★★★☆ & Up</span>

              </label>

              <label className="filter-option">

                <input
                  type="radio"
                  name="rating"
                  checked={minRating === 4.5}
                  onChange={() => setMinRating(4.5)}
                />

                <span>★★★★★ & Up</span>

              </label>

            </div>

            {/* CLEAR FILTERS */}

            <button
              className="clear-filter-button"
              onClick={clearFilters}
            >
              Clear All Filters
            </button>

          </aside>

          {/* =================================================
              PRODUCTS AREA
          ================================================= */}

          <div className="products-content">

            {/* TOOLBAR */}

            <div className="products-toolbar">

              <button
                className="mobile-filter-button"
                onClick={() => setMobileFilterOpen(true)}
              >
                ☰ Filters
              </button>

              <p>
                Showing{" "}
                <strong>
                  {filteredProducts.length}
                </strong>{" "}
                products
              </p>

              <select
                value={sortOption}
                onChange={(e) =>
                  setSortOption(e.target.value)
                }
              >

                <option value="default">
                  Sort: Featured
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

                <option value="rating">
                  Highest Rated
                </option>

              </select>

            </div>

            {/* =================================================
                PRODUCT GRID
            ================================================= */}

            {filteredProducts.length > 0 ? (

              <div className="products-grid">

                {filteredProducts.map((product) => (

                  <div
                    className="product-card"
                    key={product._id}
                  >

                    {/* PRODUCT IMAGE */}

                    <div className="product-image-container">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                      />

                      {/* SALE BADGE */}

                      {product.onSale && (
                        <span className="sale-badge">
                          SALE
                        </span>
                      )}

                    </div>

                    {/* PRODUCT CONTENT */}

                    <div className="product-card-content">

                      {/* CATEGORY */}

                      <p className="product-category">
                        {product.category?.name}
                      </p>

                      {/* NAME */}

                      <h3>
                        {product.name}
                      </h3>

                      {/* RATING */}

                      <div className="product-rating">

                        <span>
                          {"★".repeat(
                            Math.round(product.rating)
                          )}
                          {"☆".repeat(
                            5 -
                            Math.round(product.rating)
                          )}
                        </span>

                        <small>
                          {product.rating} (
                          {product.reviews}
                          )
                        </small>

                      </div>

                      {/* PRICE */}

                      <div className="product-price">

                        <strong>
                          ${product.price}
                        </strong>

                      </div>

                      {/* ADD TO CART */}

                      <button
                        className="add-cart-button"
                        onClick={() => {
                          addToCart(product);
                          printCartItems();
                        }}
                      >
                        Add to Cart
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            ) : (

              /* NO PRODUCTS */

              <div className="no-products">

                <div className="no-products-icon">
                  🔍
                </div>

                <h2>No Products Found</h2>

                <p>
                  Try changing your filters to find
                  more products.
                </p>

                <button onClick={clearFilters}>
                  Clear Filters
                </button>

              </div>

            )}

          </div>

        </div>

      </section>

    </div>
  );
}

export default Products;

