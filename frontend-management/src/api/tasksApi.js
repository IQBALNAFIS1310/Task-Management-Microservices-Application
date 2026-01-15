// src/api/tasksApi.js
const BASE_URL = "http://localhost:5094/api/Task";

// ======================
// GET
// ======================
export async function getAllTasks() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function getTasksByUser(userId) {
  const res = await fetch(`${BASE_URL}/user/${userId}`);
  return res.json();
}

// ======================
// CREATE (ADMIN - ASSIGN)
// ======================
export async function createTask(task) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  });

  return res.json();
}

// ======================
// UPDATE DATA TASK (ADMIN)
// title, description, dll
// ======================
export async function updateTask(taskId, task) {
  const res = await fetch(`${BASE_URL}/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  });

  if (!res.ok) {
    throw new Error("Gagal update task");
  }
}

// ======================
// UPDATE STATUS (USER)
// ======================
export async function updateTaskStatus(taskId, payload) {
  const res = await fetch(`${BASE_URL}/${taskId}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error("Gagal update status task");
  }
}

// ======================
// DELETE (ADMIN)
// ======================
export async function deleteTask(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) {
    throw new Error("Gagal hapus task");
  }
}
