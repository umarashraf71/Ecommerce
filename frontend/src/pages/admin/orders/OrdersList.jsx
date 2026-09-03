import { Link } from "react-router";

function OrdersList() {
  const orders = [
    {
      id: 1,
      customer: "John Doe",
      status: "Completed",
      total: "$100.00",
    },
    {
      id: 2,
      customer: "Jane Smith",
      status: "In Progress",
      total: "$200.00",
    },
    {
      id: 3,
      customer: "Bob Johnson",
      status: "Pending",
      total: "$150.00",
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
        <h1>Orders</h1>

        <Link to="/dashboard/orders/add" className="add-btn">
          + Add Order
        </Link>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="crud-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.customer}</td>
                <td>{order.status}</td>
                <td>{order.total}</td>

                <td>
                  <div className="action-buttons">

                    <Link
                      to={`/dashboard/orders/edit/${order.id}`}
                      className="edit-btn"
                    >
                      Edit
                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(order.id)}
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

export default OrdersList;
     