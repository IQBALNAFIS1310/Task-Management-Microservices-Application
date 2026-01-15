// src/api/usersApi.js
const BASE_URL = "http://localhost:5261/api/Users";

export async function loginUser(username, password) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error("Login gagal");
  return res.json();
}

export async function registerUser(user) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  if (!res.ok) throw new Error("Register gagal");
  return res.json();
}

export async function getAllUsers() {
  const res = await fetch(BASE_URL);
  return res.json();
}
