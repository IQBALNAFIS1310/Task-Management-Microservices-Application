import { useState } from "react";

const TITLE_LIMIT = 30;
const DESC_LIMIT = 50;

export default function TaskModal({
  user,
  tasks,
  onClose,
  onCreate,
  onDelete,
  onEdit
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  function resetForm() {
    setTitle("");
    setDescription("");
    setEditingId(null);
  }

  const invalid =
    title.length === 0 ||
    title.length > TITLE_LIMIT ||
    description.length > DESC_LIMIT;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded p-5 space-y-4">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">
            Task — {user.fullName}
          </h2>
          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>

        {/* TASK LIST */}
        <div className="space-y-2 max-h-60 overflow-auto">
          {tasks.length === 0 && (
            <p className="text-sm text-gray-400">
              Belum ada task
            </p>
          )}

          {tasks.map(t => (
            <div
              key={t.id}
              className="border rounded p-2 flex justify-between items-start"
            >
              <div>
                <p className="font-medium">{t.title}</p>
                <p className="text-xs text-gray-500">
                  {t.description}
                </p>
              </div>

              <div className="flex gap-2 text-xs">
                <button
                  onClick={() => {
                    setEditingId(t.id);
                    setTitle(t.title);
                    setDescription(t.description);
                  }}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (confirm("Hapus task ini?")) {
                      if (editingId === t.id) {
                        resetForm();
                      }
                      onDelete(t.id);
                    }
                  }}
                  className="text-red-600"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FORM */}
        <div className="border-t pt-3 space-y-2">
          <p className="font-medium text-sm">
            {editingId ? "Edit Task" : "Tambah Task"}
          </p>

          <input
            className="border p-2 w-full rounded"
            placeholder="Judul task"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <p className="text-xs text-gray-400">
            {title.length}/{TITLE_LIMIT}
          </p>

          <textarea
            className="border p-2 w-full rounded"
            rows={2}
            placeholder="Deskripsi"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <p className="text-xs text-gray-400">
            {description.length}/{DESC_LIMIT}
          </p>

          <div className="flex justify-end gap-2">
            {editingId && (
              <button
                onClick={resetForm}
                className="text-sm text-gray-500"
              >
                Batal
              </button>
            )}
            <button
              disabled={invalid}
              onClick={() => {
                if (editingId) {
                  onEdit(editingId, { title, description });
                } else {
                  onCreate({ title, description });
                }
                resetForm();
              }}
              className={`px-4 py-1 rounded text-white ${invalid ? "bg-gray-400" : "bg-blue-600"
                }`}
            >
              {editingId ? "Simpan" : "Tambah"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
