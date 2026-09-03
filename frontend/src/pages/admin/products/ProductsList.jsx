import { Link } from "react-router";

function ProductsList() {
  const products = [
    {
      id: 1,
      title: "Create Login Page",
      status: "Completed",
      priority: "High",
    },
    {
      id: 2,
      title: "Create Dashboard",
      status: "In Progress",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Create Profile Page",
      status: "Pending",
      priority: "Low",
    },
  ];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      console.log("Delete:", id);
    }
  };

  return (
    <div className="crud-page">

      {/* Page Header */}
      <div className="page-header">
        <h1>Products</h1>

        <Link to="/dashboard/products/add" className="add-btn">
          + Add Task
        </Link>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="crud-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.status}</td>
                <td>{task.priority}</td>

                <td>
                  <div className="action-buttons">

                    <Link
                      to={`/dashboard/products/edit/${task.id}`}
                      className="edit-btn"
                    >
                      Edit
                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default ProductsList;