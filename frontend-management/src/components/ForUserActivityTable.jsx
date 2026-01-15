import { useState, useMemo } from "react";

export default function ActivityTable({
  activities = [],
  tasksMap = {}
}) {
  const [expanded, setExpanded] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [selected, setSelected] = useState(null);

  const LIMIT = 5;

  // hanya activity task + ada commit
  const taskActivities = useMemo(() => {
    return activities.filter(
      a => a.entity === "Task" && a.comment
    );
  }, [activities]);

  // sorting
  const sortedActivities = useMemo(() => {
    const data = [...taskActivities];
    return data.sort((a, b) =>
      sortBy === "newest"
        ? new Date(b.timestamp) - new Date(a.timestamp)
        : new Date(a.timestamp) - new Date(b.timestamp)
    );
  }, [taskActivities, sortBy]);

  const visibleActivities = expanded
    ? sortedActivities
    : sortedActivities.slice(0, LIMIT);

  if (sortedActivities.length === 0) {
    return (
      <p className="text-gray-400">
        Belum ada riwayat penyelesaian
      </p>
    );
  }

  return (
    <>
      <div className="bg-white p-4 rounded shadow space-y-3">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 className="font-bold">Riwayat Tugas</h2>

          <div className="flex items-center gap-3 text-sm">
            <label className="flex items-center gap-2">
              <span className="text-gray-500">Urutkan:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="newest">Terbaru</option>
                <option value="oldest">Terlama</option>
              </select>
            </label>

            {sortedActivities.length > LIMIT && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-blue-600 hover:underline"
              >
                {expanded ? "Sembunyikan" : "Lihat semua"}
              </button>
            )}
          </div>
        </div>

        {/* LIST */}
        <ul className="text-sm space-y-3">
          {visibleActivities.map(a => (
            <li
              key={a.id}
              onClick={() => setSelected(a)}
              className="border-b pb-2 cursor-pointer hover:bg-gray-50"
            >
              <p className="font-medium">
                {tasksMap[a.entityId]?.title || "Task"}
              </p>

              <p className="italic text-gray-600 truncate">
                "{a.comment}"
              </p>

              <p className="text-xs text-gray-500">
                {new Date(a.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>

        {!expanded && sortedActivities.length > LIMIT && (
          <p className="text-xs text-gray-400">
            Menampilkan {LIMIT} dari {sortedActivities.length} aktivitas
          </p>
        )}
      </div>

      {/* DETAIL MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-5 rounded w-full max-w-md">
            <h3 className="font-bold mb-2">
              {tasksMap[selected.entityId]?.title || "Detail Task"}
            </h3>

            <p className="text-sm text-gray-600 mb-3">
              {new Date(selected.timestamp).toLocaleString()}
            </p>

            <p className="italic border-l-4 pl-3 text-gray-700">
              "{selected.comment}"
            </p>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-1 bg-blue-600 text-white rounded"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
