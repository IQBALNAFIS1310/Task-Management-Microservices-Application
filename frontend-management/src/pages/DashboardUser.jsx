import { useEffect, useState, useMemo } from "react";
import Navbar from "../components/ForAllNavbar";
import SummaryCard from "../components/ForUserSummaryCard";
import TaskTable from "../components/ForUserTaskTable";
import ActivityTable from "../components/ForUserActivityTable";

import { getTasksByUser, updateTaskStatus } from "../api/tasksApi";
import { getActivitiesByUser } from "../api/activitiesApi";

export default function DashboardUser() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedTask, setSelectedTask] = useState(null);
  const [comment, setComment] = useState("");
  const [showCommitModal, setShowCommitModal] = useState(false);

  // =====================
  // LOAD DATA
  // =====================
  const loadAll = async () => {
    setLoading(true);
    const taskData = await getTasksByUser(user.id);
    const activityData = await getActivitiesByUser(user.id);

    setTasks(taskData);
    setActivities(activityData);
    setLoading(false);
  };

  useEffect(() => {
    loadAll();
  }, []);

  // =====================
  // MAP TASK ID → TASK
  // dipakai oleh ActivityTable
  // =====================
  const tasksMap = useMemo(() => {
    return Object.fromEntries(
      tasks.map(t => [t.id, t])
    );
  }, [tasks]);

  // =====================
  // USER CLICK "SELESAIKAN"
  // =====================
  const handleCompleteClick = (task) => {
    setSelectedTask(task);
    setComment("");
    setShowCommitModal(true);
  };

  // =====================
  // SUBMIT COMMIT
  // =====================
  const submitCommit = async () => {
    if (!comment.trim()) return;

    await updateTaskStatus(selectedTask.id, {
      isCompleted: true,
      userId: user.id,
      comment
    });

    setShowCommitModal(false);
    setSelectedTask(null);
    setComment("");
    loadAll();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6 space-y-8">

        {/* SUMMARY */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SummaryCard title="Total Tasks" value={tasks.length} />
          <SummaryCard
            title="Completed"
            value={tasks.filter(t => t.isCompleted).length}
          />
          <SummaryCard
            title="Pending"
            value={tasks.filter(t => !t.isCompleted).length}
          />
        </div>

        {/* TASK LIST (HANYA BELUM SELESAI) */}
        <TaskTable
          tasks={tasks}
          loading={loading}
          onComplete={handleCompleteClick}
        />

        {/* RIWAYAT / COMMIT */}
        <ActivityTable
          activities={activities}
          tasksMap={tasksMap}
        />

      </div>

      {/* COMMIT MODAL */}
      {showCommitModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-5 rounded w-full max-w-md">
            <h3 className="font-bold mb-2">
              Commit sebelum menyelesaikan task
            </h3>

            <p className="text-sm text-gray-600 mb-2">
              {selectedTask?.title}
            </p>

            <textarea
              className="w-full border p-2 rounded"
              rows={4}
              placeholder="Tuliskan apa yang sudah kamu kerjakan"
              value={comment}
              onChange={e => setComment(e.target.value)}
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowCommitModal(false)}
                className="px-3 py-1"
              >
                Batal
              </button>
              <button
                onClick={submitCommit}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                Selesaikan Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
