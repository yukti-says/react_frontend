// import { useState, useEffect } from "react";
// import { addTodo } from "../todos";

// const AddTodo = ({ userId, editingTodo, onSaveEdit }) => {
//   const [text, setText] = useState("");

//   // Whenever a todo is selected for editing, prefill input
//   useEffect(() => {
//     if (editingTodo) {
//       setText(editingTodo.text);
//     }
//   }, [editingTodo]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!text.trim()) return;

//     if (editingTodo) {
//       // Edit mode
//       await onSaveEdit(editingTodo.id, text);
//     } else {
//       // Add mode
//       await addTodo(userId, text);
//     }

//     setText("");
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex items-center gap-3 bg-white/95 p-3 rounded-xl shadow-lg border border-white/20"
//     >
//       <input
//         type="text"
//         placeholder={editingTodo ? "Edit your task..." : "Enter a new task..."}
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         className="flex-grow px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
//       />

//       <button
//         type="submit"
//         className={`px-4 py-2 rounded-lg font-bold text-white shadow ${
//           editingTodo ? "bg-emerald-600 hover:bg-emerald-700" : "bg-lime-600 hover:bg-lime-700"
//         }`}
//       >
//         {editingTodo ? "Save" : "Add"}
//       </button>

//       {editingTodo && (
//         <button
//           type="button"
//           onClick={() => {
//             setText("");
//             onSaveEdit(null, null); // cancel edit mode
//           }}
//           className="px-3 py-2 rounded-lg bg-gray-500 text-white font-bold hover:bg-gray-600"
//         >
//           Cancel
//         </button>
//       )}
//     </form>
//   );
// };

// export default AddTodo;

// import { useState, useEffect, useRef } from "react";
// import { addTodo } from "../todos";

// const AddTodo = ({ userId, editingTodo, onSaveEdit }) => {
//   const [text, setText] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const recognitionRef = useRef(null);

//   // Prefill input if editing
//   useEffect(() => {
//     if (editingTodo) setText(editingTodo.text);
//   }, [editingTodo]);

//   // Initialize SpeechRecognition
//   useEffect(() => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (SpeechRecognition) {
//       const recognition = new SpeechRecognition();
//       recognition.lang = "en-IN"; // can switch to "hi-IN" for Hindi
//       recognition.interimResults = false;
//       recognition.maxAlternatives = 1;

//       recognition.onresult = (event) => {
//         const voiceText = event.results[0][0].transcript;
//         setText((prev) => (prev ? prev + " " + voiceText : voiceText));
//       };

//       recognition.onerror = (err) => {
//         console.error("Speech recognition error:", err);
//         setIsListening(false);
//       };

//       recognition.onend = () => {
//         setIsListening(false);
//       };

//       recognitionRef.current = recognition;
//     }
//   }, []);

//   // Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!text.trim()) return;

//     if (editingTodo) {
//       await onSaveEdit(editingTodo.id, text);
//     } else {
//       await addTodo(userId, text);
//     }

//     setText("");
//   };

//   // Start/stop voice input
//   const handleVoiceInput = () => {
//     if (!recognitionRef.current) {
//       alert("Speech recognition not supported in this browser 😢");
//       return;
//     }

//     if (isListening) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     } else {
//       recognitionRef.current.start();
//       setIsListening(true);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex items-center gap-3 bg-white/95 p-3 rounded-xl shadow-lg border border-white/20"
//     >
//       <input
//         type="text"
//         placeholder={editingTodo ? "Edit your task..." : "Enter a new task..."}
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         className="flex-grow px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
//       />

//       {/* 🎤 Mic button */}
//       <button
//         type="button"
//         onClick={handleVoiceInput}
//         className={`px-3 py-2 rounded-lg font-bold shadow transition ${
//           isListening
//             ? "bg-red-500 text-white animate-pulse"
//             : "bg-indigo-500 hover:bg-indigo-600 text-white"
//         }`}
//       >
//         🎤
//       </button>

//       <button
//         type="submit"
//         className={`px-4 py-2 rounded-lg font-bold text-white shadow ${
//           editingTodo
//             ? "bg-emerald-600 hover:bg-emerald-700"
//             : "bg-lime-600 hover:bg-lime-700"
//         }`}
//       >
//         {editingTodo ? "Save" : "Add"}
//       </button>

//       {editingTodo && (
//         <button
//           type="button"
//           onClick={() => onSaveEdit(null, null)} // cancel edit
//           className="px-3 py-2 rounded-lg bg-gray-500 text-white font-bold hover:bg-gray-600"
//         >
//           Cancel
//         </button>
//       )}
//     </form>
//   );
// };

// export default AddTodo;

import { useState, useEffect, useRef } from "react";
import { addTodo } from "../todos";

const AddTodo = ({ userId, editingTodo, onSaveEdit }) => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState("en-IN"); // 🌐 Language state
  const recognitionRef = useRef(null);

  // Prefill input if editing
  useEffect(() => {
    if (editingTodo) setText(editingTodo.text);
  }, [editingTodo]);

  // Initialize SpeechRecognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = language;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const voiceText = event.results[0][0].transcript;
        setText((prev) => (prev ? prev + " " + voiceText : voiceText));
      };

      recognition.onerror = (err) => {
        console.error("Speech recognition error:", err);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [language]); // re-init when language changes ✅

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

  // Start/stop voice input
  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition not supported in this browser 😢");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.lang = language; // ✅ ensure correct lang before start
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Toggle between English & Hindi
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en-IN" ? "hi-IN" : "en-IN"));
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

      {/* 🎤 Mic button */}
      <button
        type="button"
        onClick={handleVoiceInput}
        className={`px-3 py-2 rounded-lg font-bold shadow transition ${
          isListening
            ? "bg-red-500 text-white animate-pulse"
            : "bg-indigo-500 hover:bg-indigo-600 text-white"
        }`}
      >
        🎤
      </button>

      {/* 🌐 Language toggle */}
      <button
        type="button"
        onClick={toggleLanguage}
        className="px-3 py-2 rounded-lg bg-gray-700 text-white font-bold hover:bg-gray-800 transition"
      >
        {language === "en-IN" ? "EN" : "HI"}
      </button>

      {/* Add/Save button */}
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

      {/* Cancel button */}
      {editingTodo && (
        <button
          type="button"
          onClick={() => onSaveEdit(null, null)}
          className="px-3 py-2 rounded-lg bg-gray-500 text-white font-bold hover:bg-gray-600"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default AddTodo;
