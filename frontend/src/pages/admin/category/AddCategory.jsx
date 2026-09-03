import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../../../utils/api.js";

function AddCategory() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    status: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // Handle input change
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
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

      await api.post("/categories", formData);

      alert("Category added successfully");

      navigate("/dashboard/categories");

    } catch (error) {

      console.log("Add Category Error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to add category"
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="crud-page">

      <div className="page-header">

        <h1>Add Category</h1>

      </div>


      {error && (
        <p className="error-message">
          {error}
        </p>
      )}


      <div className="form-container">

        <form onSubmit={handleSubmit}>

          {/* Category Name */}
          <div className="form-group">

            <label htmlFor="name">
              Category Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter category name"
              required
            />

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
              {loading ? "Saving..." : "Add Category"}
            </button>


            <button
              type="button"
              className="cancel-btn"
              onClick={() =>
                navigate("/dashboard/categories")
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

export default AddCategory;
