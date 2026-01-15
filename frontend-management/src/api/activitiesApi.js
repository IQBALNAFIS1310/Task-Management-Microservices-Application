const BASE_URL = "http://localhost:5148/api/Activities";

// Get all activities (admin)
export const getAllActivities = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

// Get activities by user ID
export const getActivitiesByUser = async (userId) => {
  const res = await fetch(`${BASE_URL}/user/${userId}`);
  return res.json();
};

// Log new activity
export const logActivity = async (activity) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(activity)
  });
  return res.json();
};
