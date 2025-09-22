import { useState, useEffect } from "react";
import { addTodo } from "../todos";

const AddTodo = ({ userId, editingTodo, onSaveEdit }) => {
  const [text, setText] = useState("");

  // Whenever a todo is selected for editing, prefill input
  useEffect(() => {
    if (editingTodo) {
      setText(editingTodo.text);
    }
  }, [editingTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (editingTodo) {
      // Edit mode
      await onSaveEdit(editingTodo.id, text);
    } else {
      // Add mode
      await addTodo(userId, text);
    }

    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 bg-white/95 p-3 rounded-xl shadow-lg border border-white/20"
    >
      <input
        type="text"
        placeholder={editingTodo ? "Edit your task..." : "Enter a new task..."}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-grow px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      />

      <button
        type="submit"
        className={`px-4 py-2 rounded-lg font-bold text-white shadow ${
          editingTodo ? "bg-emerald-600 hover:bg-emerald-700" : "bg-lime-600 hover:bg-lime-700"
        }`}
      >
        {editingTodo ? "Save" : "Add"}
      </button>

      {editingTodo && (
        <button
          type="button"
          onClick={() => {
            setText("");
            onSaveEdit(null, null); // cancel edit mode
          }}
          className="px-3 py-2 rounded-lg bg-gray-500 text-white font-bold hover:bg-gray-600"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default AddTodo;
