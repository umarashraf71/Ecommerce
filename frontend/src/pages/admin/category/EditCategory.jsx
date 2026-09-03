
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../../../utils/api.js";

function EditCategory() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    status: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");


  // Get Category
  const getCategory = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await api.get(`/categories/${id}`);

      const category = response.data.category;

      setFormData({
        name: category.name,
        status: category.status,
      });

    } catch (error) {

      console.log("Get Category Error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load category"
      );

    } finally {

      setLoading(false);

    }
  };


  // Get category when page loads
  useEffect(() => {

    getCategory();

  }, [id]);


  // Handle input change
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  // Handle status change
  const handleStatusChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      status: e.target.value === "true",
    }));

  };


  // Update Category
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);
      setError("");

      await api.put(`/categories/${id}`, {
        name: formData.name,
        status: formData.status,
      });

      alert("Category updated successfully");

      navigate("/dashboard/categories");

    } catch (error) {

      console.log("Update Category Error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to update category"
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
          Loading category...
        </p>

      </div>
    );

  }


  return (
    <div className="crud-page">

      {/* Page Header */}
      <div className="page-header">

        <h1>Edit Category</h1>

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
              disabled={saving}
            >
              {saving ? "Updating..." : "Update Category"}
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

export default EditCategory;

