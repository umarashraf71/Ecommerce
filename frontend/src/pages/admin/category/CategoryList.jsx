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

      // console.log("Categories Response:", response.data);

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


  // Delete Category
  const handleDelete = (id) => {

    if (
      window.confirm(
        "Are you sure you want to delete this category?"
      )
    ) {
      console.log("Delete:", id);
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

                    <td>
                      {category.status}
                    </td>

                    <td>

                      <div className="action-buttons">

                        <Link
                          to={`/dashboard/categories/edit/${category._id}`}
                          className="edit-btn"
                        >
                          Edit
                        </Link>


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