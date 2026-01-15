import { useState } from "react";

export default function AssignTaskModal({ user, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded w-full max-w-md space-y-3">
        <h3 className="font-bold">
          Tambah Task untuk {user.fullName}
        </h3>

        <input
          className="border p-2 w-full rounded"
          placeholder="Judul task"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full rounded"
          rows={3}
          placeholder="Deskripsi task"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Batal</button>
          <button
            onClick={() => onSave({ title, description })}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
