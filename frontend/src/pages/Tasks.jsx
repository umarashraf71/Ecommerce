import React, { useEffect, useState } from "react";
import api from "../utils/api";

function Tasks() {
 const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/tasks");

      setTasks(response.data.tasks);
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to fetch tasks"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

 return (
    <div className="tasks-page">

      <div className="page-header">

        <div>
          <h1>Tasks</h1>

          <p className="page-subtitle">
            Manage your tasks here.
          </p>
        </div>

        <button className="primary-button">
          Create Task
        </button>

      </div>


      {/* Loading */}

      {loading && (
        <p>Loading tasks...</p>
      )}


      {/* Error */}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}


      {/* Tasks Table */}

      {!loading && !error && (
        <div className="tasks-table-container">

          <table className="tasks-table">

            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {tasks.length === 0 ? (

                <tr>
                  <td
                    colSpan="5"
                    style={{ textAlign: "center" }}
                  >
                    No tasks found
                  </td>
                </tr>

              ) : (

                tasks.map((task) => (

                  <tr key={task._id}>

                    <td>
                      {task.title}
                    </td>

                    <td>
                      {task.description}
                    </td>

                    <td>
                      <span
                        className={`status ${task.status}`}
                      >
                        {task.status}
                      </span>
                    </td>

                    <td>
                      {task.priority}
                    </td>

                    <td>

                      <button className="table-button">
                        View
                      </button>

                      <button className="table-button">
                        Edit
                      </button>

                      <button className="delete-button">
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default Tasks;