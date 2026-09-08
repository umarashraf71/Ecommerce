import { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../../../utils/api.js";

function CategoryList() {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // Get Categories
  const getCategories = async () => {
    try {

      setLoading(true);
      setError("");

      const response = await api.get("/categories");

      setCategories(response.data.categories);

    } catch (error) {

      console.log("Get Categories Error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load categories"
      );

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getCategories();
  }, []);


  // Activate / Deactivate Category
  const handleStatusChange = async (id, currentStatus) => {

    const newStatus = !currentStatus;

    const action = newStatus ? "activate" : "deactivate";

    if (
      !window.confirm(
        `Are you sure you want to ${action} this category?`
      )
    ) {
      return;
    }

    try {

      await api.post(`/categories/updateStatus`, {
        status: newStatus,
        id:id
      });

      // Update status in UI without fetching categories again
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category._id === id
            ? { ...category, status: newStatus }
            : category
        )
      );

    } catch (error) {

      console.log("Status Change Error:", error);

      alert(
        error.response?.data?.message ||
        `Failed to ${action} category`
      );
    }
  };


  // Delete Category
  const handleDelete = async (id) => {

    if (
      window.confirm(
        "Are you sure you want to delete this category?"
      )
    ) {

    try {

      await api.delete(`/categories/${id}`);

      // Update status in UI without fetching categories again
      setCategories((prevCategories) =>
        prevCategories.filter((category) =>
          category._id !== id
         )
      );

    } catch (error) {

      console.log("Status Change Error:", error);

      alert(
        error.response?.data?.message ||
        `Failed to ${action} category`
      );
    }

    }

  };


  return (
    <div className="crud-page">

      {/* Page Header */}
      <div className="page-header">

        <h1>Categories</h1>

        <Link
          to="/dashboard/categories/add"
          className="add-btn"
        >
          + Add Category
        </Link>

      </div>


      {/* Loading */}
      {loading && (
        <p>Loading categories...</p>
      )}


      {/* Error */}
      {error && (
        <p className="error-message">
          {error}
        </p>
      )}


      {/* Table */}
      {!loading && !error && (
        <div className="table-container">

          <table className="crud-table">

            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>


            <tbody>

              {categories.length > 0 ? (

                categories.map((category, index) => (

                  <tr key={category._id}>

                    <td>{index + 1}</td>

                    <td>
                      {category.name}
                    </td>


                    {/* Status */}
                    <td>

                      {category.status ? (
                        <span className="status-active">
                          Active
                        </span>
                      ) : (
                        <span className="status-inactive">
                          Inactive
                        </span>
                      )}

                    </td>


                    {/* Actions */}
                    <td>

                      <div className="action-buttons">

                        {/* Edit */}
                        <Link
                          to={`/dashboard/categories/edit/${category._id}`}
                          className="edit-btn"
                        >
                          Edit
                        </Link>


                        {/* Activate / Deactivate */}
                        {category.status ? (

                          <button
                            className="deactivate-btn"
                            onClick={() =>
                              handleStatusChange(
                                category._id,
                                category.status
                              )
                            }
                          >
                            Deactivate
                          </button>

                        ) : (

                          <button
                            className="activate-btn"
                            onClick={() =>
                              handleStatusChange(
                                category._id,
                                category.status
                              )
                            }
                          >
                            Activate
                          </button>

                        )}


                        {/* Delete */}
                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(category._id)
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="4">
                    No categories found
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default CategoryList;

