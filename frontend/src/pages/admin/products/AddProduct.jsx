import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../../../utils/api.js";

function AddProduct() {

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    rating: "",
    reviews: "",
    onSale: false,
    status: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // Get categories for the dropdown
  const getCategories = async () => {

    try {

      const response = await api.get("/categories");

      setCategories(response.data.categories);

    } catch (error) {

      console.log("Get Categories Error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load categories"
      );

    }
  };


  useEffect(() => {
    getCategories();
  }, []);


  // Handle input change
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // Handle sale change
  const handleSaleChange = (e) => {

    setFormData({
      ...formData,
      onSale: e.target.value === "true",
    });
  };


  // Handle status change
  const handleStatusChange = (e) => {

    setFormData({
      ...formData,
      status: e.target.value === "true",
    });
  };


  // Submit form
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);
      setError("");

      await api.post("/products", formData);

      alert("Product added successfully");

      navigate("/dashboard/products");

    } catch (error) {

      console.log("Add Product Error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to add product"
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="crud-page">

      <div className="page-header">

        <h1>Add Product</h1>

      </div>


      {error && (
        <p className="error-message">
          {error}
        </p>
      )}


      <div className="form-container">

        <form onSubmit={handleSubmit}>

          {/* Product Name */}
          <div className="form-group">

            <label htmlFor="name">
              Product Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />

          </div>


          {/* Category */}
          <div className="form-group">

            <label htmlFor="category">
              Category
            </label>

            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >

              <option value="">
                Select category
              </option>

              {categories.map((category) => (

                <option
                  key={category._id}
                  value={category._id}
                >
                  {category.name}
                </option>

              ))}

            </select>

          </div>


          {/* Image */}
          <div className="form-group">

            <label htmlFor="image">
              Image URL
            </label>

            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/shoe.jpg"
              required
            />

          </div>


          {/* Price */}
          <div className="form-group">

            <label htmlFor="price">
              Price
            </label>

            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="59.99"
              min="0"
              step="0.01"
              required
            />

          </div>



          {/* Rating */}
          <div className="form-group">

            <label htmlFor="rating">
              Rating
            </label>

            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="0 to 5"
              min="0"
              max="5"
              step="0.1"
            />

          </div>


          {/* Reviews */}
          <div className="form-group">

            <label htmlFor="reviews">
              Reviews Count
            </label>

            <input
              type="number"
              id="reviews"
              name="reviews"
              value={formData.reviews}
              onChange={handleChange}
              placeholder="24"
              min="0"
            />

          </div>


          {/* Sale */}
          <div className="form-group">

            <label htmlFor="onSale">
              Sale
            </label>

            <select
              id="onSale"
              name="onSale"
              value={formData.onSale}
              onChange={handleSaleChange}
            >

              <option value="false">
                Not on sale
              </option>

              <option value="true">
                On sale
              </option>

            </select>

          </div>


          {/* Status */}
          <div className="form-group">

            <label htmlFor="status">
              Status
            </label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleStatusChange}
            >

              <option value="true">
                Active
              </option>

              <option value="false">
                Inactive
              </option>

            </select>

          </div>


          {/* Buttons */}
          <div className="form-buttons">

            <button
              type="submit"
              className="save-btn"
              disabled={loading}
            >
              {loading ? "Saving..." : "Add Product"}
            </button>


            <button
              type="button"
              className="cancel-btn"
              onClick={() =>
                navigate("/dashboard/products")
              }
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddProduct;