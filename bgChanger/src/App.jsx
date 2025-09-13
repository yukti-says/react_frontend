import React, { useState } from 'react'



const App = () => {
  const [color, setColor] = useState("olive");

  return (
    <>
      <div
        className="w-full h-screen"
        style={{ backgroundColor: color }}
      >
        <div className="flex flex-wrap justify-center bottom-12 inset-x-0 px-2 gap-4 absolute">
          <button
            onClick={() => setColor("green")}
            className="bg-green-500 py-3 px-4 rounded-md border font-mono font-semibold hover:bg-green-600"
          >
            Green
          </button>
          <button
            onClick={() => setColor("blue")}
            className="bg-blue-500 py-3 px-4 rounded-md border font-mono font-semibold hover:bg-blue-600"
          >
            Blue
          </button>
          <button
            onClick={() => setColor("black")}
            className="bg-slate-900 py-3 px-4 rounded-md border font-mono font-semibold text-white hover:bg-slate-800"
          >
            Black
          </button>
          <button
            onClick={() => setColor("red")}
            className="bg-red-500 py-3 px-4 rounded-md border font-mono font-semibold hover:bg-red-600"
          >
            Red
          </button>
          <button
            onClick={() => setColor("yellow")}
            className="bg-yellow-500 py-3 px-4 rounded-md border font-mono font-semibold hover:bg-yellow-600"
          >
            Yellow
          </button>
        </div>
      </div>
    </>
  );
};

export default App;