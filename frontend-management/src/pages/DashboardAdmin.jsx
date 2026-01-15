import { useEffect, useState } from "react";
import Navbar from "../components/ForAllNavbar";

import { getAllUsers } from "../api/usersApi";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
} from "../api/tasksApi";

import TaskModal from "../components/ForAdminTaskModal";

export default function DashboardAdmin() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState(null);

  /* =====================
     LOAD DATA
  ===================== */
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const [u, t] = await Promise.all([
      getAllUsers(),
      getAllTasks()
    ]);
    setUsers(u);
    setTasks(t);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <p className="p-6 text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="font-bold text-xl mb-4">
          Dashboard Admin
        </h1>

        {/* USER TABLE */}
        <table className="w-full bg-white rounded shadow text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-center">Total Task</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
              const userTasks = tasks.filter(
                t => t.assignedToUserId === user.id
              );

              return (
                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedUser(user)}
                >
                  <td className="p-3 font-medium">
                    {user.fullName}
                  </td>
                  <td className="p-3 text-gray-500">
                    @{user.username}
                  </td>
                  <td className="p-3 text-center">
                    {userTasks.length}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* TASK MODAL */}
      {selectedUser && (
        <TaskModal
          user={selectedUser}
          tasks={tasks.filter(
            t => t.assignedToUserId === selectedUser.id
          )}
          onClose={() => setSelectedUser(null)}

          /* CREATE */
          onCreate={async data => {
            await createTask({
              ...data,
              assignedToUserId: selectedUser.id
            });
            await loadData();
          }}

          /* UPDATE */
          onEdit={async (taskId, data) => {
            await updateTask(taskId, data);
            await loadData();
          }}

          /* DELETE */
          onDelete={async taskId => {
            await deleteTask(taskId);
            await loadData();
          }}
        />
      )}
    </div>
  );
}
