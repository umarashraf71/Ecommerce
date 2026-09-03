import React, { useState } from "react";
import {useCart} from "../context/CartContext.jsx";


const products = [
  {
    _id: 1,
    name: "Premium Wireless Headphones",
    price: 89.99,
    oldPrice: 119.99,
    category: "Electronics",
    rating: 4.8,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
  },
  {
    _id: 2,
    name: "Classic White Sneakers",
    price: 59.99,
    oldPrice: 79.99,
    category: "Shoes",
    rating: 4.6,
    reviews: 98,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
  },
  {
    _id: 3,
    name: "Smart Watch Series 5",
    price: 129.99,
    oldPrice: 159.99,
    category: "Accessories",
    rating: 4.9,
    reviews: 210,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
  },
  {
    _id: 4,
    name: "Leather Backpack",
    price: 74.99,
    oldPrice: 99.99,
    category: "Bags",
    rating: 4.5,
    reviews: 76,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
  },
  {
    _id: 5,
    name: "Modern Sunglasses",
    price: 39.99,
    oldPrice: 54.99,
    category: "Fashion",
    rating: 4.4,
    reviews: 65,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
  },
  {
    _id: 6,
    name: "Minimalist Backpack",
    price: 64.99,
    oldPrice: 84.99,
    category: "Bags",
    rating: 4.7,
    reviews: 88,
    image:
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600",
  },
  {
    _id: 7,
    name: "Running Sports Shoes",
    price: 69.99,
    oldPrice: 89.99,
    category: "Shoes",
    rating: 4.6,
    reviews: 112,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
  },
  {
    _id: 8,
    name: "Wireless Smart Speaker",
    price: 79.99,
    oldPrice: 99.99,
    category: "Electronics",
    rating: 4.5,
    reviews: 91,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
  },
  {
    _id: 9,
    name: "Premium Casual Watch",
    price: 109.99,
    oldPrice: 139.99,
    category: "Accessories",
    rating: 4.8,
    reviews: 143,
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600",
  },
];

function Products() {

  const {addToCart, printCartItems} = useCart();

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [maxPrice, setMaxPrice] = useState(200);

  const [minRating, setMinRating] = useState(0);

  const [sortOption, setSortOption] = useState("default");

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory === "All") {
        return true;
      }

      return product.category === selectedCategory;
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

              <label className="filter-option">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === "All"}
                  onChange={() => setSelectedCategory("All")}
                />

                <span>All Products</span>
              </label>

              <label className="filter-option">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === "Electronics"}
                  onChange={() =>
                    setSelectedCategory("Electronics")
                  }
                />

                <span>Electronics</span>
              </label>

              <label className="filter-option">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === "Shoes"}
                  onChange={() => setSelectedCategory("Shoes")}
                />

                <span>Shoes</span>
              </label>

              <label className="filter-option">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === "Bags"}
                  onChange={() => setSelectedCategory("Bags")}
                />

                <span>Bags</span>
              </label>

              <label className="filter-option">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === "Accessories"}
                  onChange={() =>
                    setSelectedCategory("Accessories")
                  }
                />

                <span>Accessories</span>
              </label>

              <label className="filter-option">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === "Fashion"}
                  onChange={() => setSelectedCategory("Fashion")}
                />

                <span>Fashion</span>
              </label>

            </div>


            {/* PRICE */}

            <div className="filter-group">

              <h3>Maximum Price</h3>

              <div className="price-range-value">
                <span>$0</span>
                <strong>${maxPrice}</strong>
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
              onClick={() => {
                setSelectedCategory("All");
                setMaxPrice(200);
                setMinRating(0);
              }}
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
                <strong>{filteredProducts.length}</strong>{" "}
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


            {/* PRODUCT GRID */}

            {filteredProducts.length > 0 ? (

              <div className="products-grid">

                {filteredProducts.map((product) => (

                  <div
                    className="product-card"
                    key={product._id}
                  >

                    <div className="product-image-container">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                      />

                      <span className="sale-badge">
                        SALE
                      </span>

                    </div>


                    <div className="product-card-content">

                      <p className="product-category">
                        {product.category}
                      </p>

                      <h3>{product.name}</h3>

                      {/* <div className="product-rating">

                        <span>★★★★★</span>

                        <small>
                          {product.rating} ({product.reviews})
                        </small>

                      </div> */}


                      <div className="product-price">

                        <strong>
                          ${product.price}
                        </strong>

                        <span>
                          ${product.oldPrice}
                        </span>

                      </div>


                      <button className="add-cart-button" onClick={()=> {addToCart(product); printCartItems();}}>
                        Add to Cart
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            ) : (

              <div className="no-products">

                <div className="no-products-icon">
                  🔍
                </div>

                <h2>No Products Found</h2>

                <p>
                  Try changing your filters to find
                  more products.
                </p>

                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setMaxPrice(200);
                    setMinRating(0);
                  }}
                >
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

