import { toggleTodo, deleteTodoById } from "../todos";
import { useState } from "react";

const TodoList = ({ todos, onEdit }) => {

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`flex items-center m-1 justify-between bg-white/95 p-3 rounded-xl shadow-lg border border-white/20 ${
            todo.completed ? "opacity-90" : ""
          }`}
        >
          {/* Task text */}
          <span
            onClick={() => toggleTodo(todo.id, todo.completed)}
            className={`flex-grow cursor-pointer m-1 text-lg font-medium ${
              todo.completed ? "line-through text-gray-500" : "text-gray-600"
            }`}
          >
            {todo.text}
          </span>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(todo)} // pass todo to AddTodo for editing
              className="px-2 py-1 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow"
            >
              ✏️
            </button>
            <button
              onClick={() => deleteTodoById(todo.id)}
              className="px-2 py-1 rounded-lg bg-red-300 text-white hover:bg-red-500 shadow"
            >
              ✖
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
