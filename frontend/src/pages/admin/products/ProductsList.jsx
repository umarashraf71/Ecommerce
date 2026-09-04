import { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../../../utils/api.js";

function ProductsList() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // Get Products
  const getProducts = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await api.get("/products");

      setProducts(response.data.products);

    } catch (error) {

      console.log("Get Products Error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load products"
      );

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getProducts();
  }, []);


  // Activate / Deactivate Product
  const handleStatusChange = async (id, currentStatus) => {

    const newStatus = !currentStatus;

    const action = newStatus ? "activate" : "deactivate";

    if (
      !window.confirm(
        `Are you sure you want to ${action} this product?`
      )
    ) {
      return;
    }

    try {

      await api.post(`/products/updateStatus`, {
        status: newStatus,
        id: id,
      });

      // Update status in UI without fetching products again
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === id
            ? { ...product, status: newStatus }
            : product
        )
      );

    } catch (error) {

      console.log("Status Change Error:", error);

      alert(
        error.response?.data?.message ||
        `Failed to ${action} product`
      );
    }
  };


  // Delete Product
  const handleDelete = async (id) => {

    if (
      window.confirm(
        "Are you sure you want to delete this product?"
      )
    ) {

      try {

        await api.delete(`/products/${id}`);

        // Remove from UI without fetching products again
        setProducts((prevProducts) =>
          prevProducts.filter((product) =>
            product._id !== id
          )
        );

      } catch (error) {

        console.log("Delete Product Error:", error);

        alert(
          error.response?.data?.message ||
          "Failed to delete product"
        );
      }

    }

  };


  return (
    <div className="crud-page">

      {/* Page Header */}
      <div className="page-header">

        <h1>Products</h1>

        <Link
          to="/dashboard/products/add"
          className="add-btn"
        >
          + Add Product
        </Link>

      </div>


      {/* Loading */}
      {loading && (
        <p>Loading products...</p>
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
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Sale</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>


            <tbody>

              {products.length > 0 ? (

                products.map((product, index) => (

                  <tr key={product._id}>

                    <td>{index + 1}</td>


                    {/* Image */}
                    <td>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="table-image"
                        width="100"
                      />
                    </td>


                    <td>
                      {product.name}
                    </td>


                    {/* Category */}
                    <td>
                      {product.category?.name || "-"}
                    </td>


                    {/* Price */}
                    <td>

                      ${product.price}

                    </td>


                    {/* Rating */}
                    <td>
                      {product.rating} ({product.reviews})
                    </td>


                    {/* Sale */}
                    <td>
                      {product.onSale ? "Sale" : "-"}
                    </td>


                    {/* Status */}
                    <td>

                      {product.status ? (
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
                          to={`/dashboard/products/edit/${product._id}`}
                          className="edit-btn"
                        >
                          Edit
                        </Link>


                        {/* Activate / Deactivate */}
                        {product.status ? (

                          <button
                            className="deactivate-btn"
                            onClick={() =>
                              handleStatusChange(
                                product._id,
                                product.status
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
                                product._id,
                                product.status
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
                            handleDelete(product._id)
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
                  <td colSpan="9">
                    No products found
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

export default ProductsList;