// ForAdminUserActivityHistory.jsx
export default function UserActivityHistory({ activities, tasksMap }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-6 text-gray-400 text-sm border rounded">
        Belum ada aktivitas user
      </div>
    );
  }

  return (
    <ul className="space-y-4 text-sm">
      {activities.map(a => {
        const taskTitle = tasksMap[a.entityId]?.title || "Task tidak ditemukan";

        return (
          <li
            key={a.id}
            className="border rounded p-3 bg-white hover:bg-gray-50 transition"
          >
            {/* TASK TITLE */}
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-800">
                📝 {taskTitle}
              </p>

              <span className="text-xs text-gray-400">
                {new Date(a.timestamp).toLocaleString()}
              </span>
            </div>

            {/* COMMENT */}
            <div className="mt-2 pl-1">
              {a.comment ? (
                <p className="italic text-gray-600 border-l-2 border-blue-400 pl-3">
                  “{a.comment}”
                </p>
              ) : (
                <p className="italic text-gray-400">
                  Tidak ada komentar
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
