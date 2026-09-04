import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../../../utils/api.js";

function EditProduct() {

  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");


  // Get categories and product together
  const getPageData = async () => {

    try {

      setLoading(true);
      setError("");

      const categoriesResponse = await api.get("/categories");

      setCategories(categoriesResponse.data.categories);

      const response = await api.get(`/products/${id}`);

      const product = response.data.product;

      setFormData({
        name: product.name,
        category: product.category?._id || product.category,
        image: product.image,
        price: product.price,
        rating: product.rating,
        reviews: product.reviews,
        onSale: product.onSale,
        status: product.status,
      });

    } catch (error) {

      console.log("Get Product Error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load product"
      );

    } finally {

      setLoading(false);

    }
  };


  // Get product when page loads
  useEffect(() => {

    getPageData();

  }, [id]);


  // Handle input change
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  // Handle sale change
  const handleSaleChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      onSale: e.target.value === "true",
    }));

  };


  // Handle status change
  const handleStatusChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      status: e.target.value === "true",
    }));

  };


  // Update Product
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);
      setError("");

      await api.put(`/products/${id}`, {
        name: formData.name,
        category: formData.category,
        image: formData.image,
        price: formData.price,
        rating: formData.rating,
        reviews: formData.reviews,
        onSale: formData.onSale,
        status: formData.status,
      });

      alert("Product updated successfully");

      navigate("/dashboard/products");

    } catch (error) {

      console.log("Update Product Error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to update product"
      );

    } finally {

      setSaving(false);

    }
  };


  // Loading
  if (loading) {

    return (
      <div className="crud-page">

        <p className="loading-message">
          Loading product...
        </p>

      </div>
    );

  }


  return (
    <div className="crud-page">

      {/* Page Header */}
      <div className="page-header">

        <h1>Edit Product</h1>

      </div>


      {/* Error */}
      {error && (
        <p className="error-message">
          {error}
        </p>
      )}


      {/* Form */}
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
              disabled={saving}
            >
              {saving ? "Updating..." : "Update Product"}
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

export default EditProduct;