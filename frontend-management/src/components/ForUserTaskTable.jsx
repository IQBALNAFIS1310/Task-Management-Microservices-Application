export default function TaskTable({ tasks = [], loading, onComplete }) {
  if (loading) {
    return <p className="text-gray-500">Loading tasks...</p>;
  }

  const pendingTasks = tasks.filter(t => !t.isCompleted);

  if (pendingTasks.length === 0) {
    return (
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">Tugas Belum Selesai</h2>
        <p className="text-gray-400 text-sm">
          Semua tugas sudah diselesaikan
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow space-y-3">
      <h2 className="font-bold">Tugas Belum Selesai</h2>

      <table className="w-full border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2 text-left">Judul</th>
            <th className="border p-2 text-left hidden md:table-cell">
              Deskripsi
            </th>
            <th className="border p-2 text-center">Status</th>
            <th className="border p-2 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {pendingTasks.map(task => (
            <tr key={task.id} className="hover:bg-gray-50">
              <td className="border p-2">{task.title}</td>

              <td className="border p-2 hidden md:table-cell">
                {task.description}
              </td>

              <td className="border p-2 text-center">
                <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700">
                  Pending
                </span>
              </td>

              <td className="border p-2 text-center">
                <button
                  onClick={() => onComplete(task)}
                  className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded"
                >
                  Selesaikan
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
