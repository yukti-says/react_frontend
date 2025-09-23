import { useState, useEffect, useRef } from "react";
import { addTodo } from "../todos";

const VoiceAddTodo = ({ userId, editingTodo, onSaveEdit }) => {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false); // Track mic state
  const recognitionRef = useRef(null);

  // Prefill input if editing
  useEffect(() => {
    if (editingTodo) {
      setText(editingTodo.text);
    }
  }, [editingTodo]);

  // Setup Speech Recognition API
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-IN"; // 👈 default English (India), can be switched
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setListening(true);
      recognition.onend = () => setListening(false);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setText((prev) => prev + " " + transcript); // Append spoken text
      };

      recognitionRef.current = recognition;
    } else {
      console.warn("Speech Recognition not supported in this browser.");
    }
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (editingTodo) {
      await onSaveEdit(editingTodo.id, text);
    } else {
      await addTodo(userId, text);
    }

    setText("");
  };

  // Start listening for voice
  const handleVoiceInput = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 bg-white/95 p-3 rounded-xl shadow-lg border border-white/20"
    >
      {/* Input box */}
      <input
        type="text"
        placeholder={editingTodo ? "Edit your task..." : "Enter a new task..."}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-grow px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      />

      {/* 🎤 Voice button */}
      <button
        type="button"
        onClick={handleVoiceInput}
        className={`px-3 py-2 rounded-lg font-bold text-white shadow ${
          listening
            ? "bg-red-600 animate-pulse"
            : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        {listening ? "🎙 Listening..." : "🎤 Voice"}
      </button>

      {/* Submit button */}
      <button
        type="submit"
        className={`px-4 py-2 rounded-lg font-bold text-white shadow ${
          editingTodo
            ? "bg-emerald-600 hover:bg-emerald-700"
            : "bg-lime-600 hover:bg-lime-700"
        }`}
      >
        {editingTodo ? "Save" : "Add"}
      </button>

      {/* Cancel button for editing */}
      {editingTodo && (
        <button
          type="button"
          onClick={() => {
            setText("");
            onSaveEdit(null, null); // cancel edit
          }}
          className="px-3 py-2 rounded-lg bg-gray-500 text-white font-bold hover:bg-gray-600"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default VoiceAddTodo;
