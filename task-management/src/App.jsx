import React, { useState  ,useEffect} from 'react'

const App = () => {
 const [tasks, setTasks] = useState(() => {
   try {
     const storedTasks = localStorage.getItem("tasks");
     return storedTasks ? JSON.parse(storedTasks) : [];
   } catch (error) {
     console.error("Error reading tasks:", error);
     return [];
   }
 }); //? local storage saving array that holds task objects{id,text,completed}
  const [newTasks, setNewTasks] = useState("")//?current value of the input box should be empty
  
  const [editingId, setEditingId] = useState(null) //? which task is being edited
  const [editingText, setEditingText] = useState("") //? new text while editing
  //* Called when the input value changes.
  //* `event` is the browser event; event.target is the input element.
  //* event.target.value is the current text inside the input.
  function handleInputChange(event) {
    setNewTasks(event.target.value)
    console.log(event);
    
  }

  //* addition a new task
  function handleAddTask() {
    //? what if it is empty
    const text = newTasks.trim();
    if (text === "") return //?simply return
  
    //* creating an object date.now() this gives a simple unique id
    const task = {
      id: Date.now(),
      text: text,
      completed: false,
    }
 
    // Use a new array — React notices the new array and rerenders.
    // Use the *functional form* setTasks(prev => ...) to avoid stale state.
    setTasks((prevTasks) => [...prevTasks, task]);

    // Clear the input box after adding
    setNewTasks("");
  }

  //*start edition
  function startEditing(task) {
    setEditingId(task.id);
    setEditingText(task.text)
  }

  //*save edit
  function saveEdit(id) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: editingText } : task
    ))
    setEditingId(null) //? stoping edition
    setEditingText("");
  }

  //* cancle edit
  function cancleEdit() {
    setEditingId(null);
    setEditingText("");
  }

  //* Toggle completed state for a task (true <-> false)
  function handleToggelTask(id) {
    //? map returns a new array we return a modified copy of the matched tasks

    // *  {...task,completed:!task.completed} =>  Take everything from task → (id, text, completed).
    //*  Then override completed with true.
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  //*delete function filtering the task if task.id===id then filter it and store bache hue tasks
  function handleDeleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }
//![  LOCAL STORAGE]
  //* Step 1: Load tasks from localStorage on app start When the app first loads, we check if tasks already exist in localStorage.If yes → restore them.
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Failed to parse tasks from localStorage:", error);
    }
  }, []); //? run only when the app loads

  //* save tasks whenever they change ,when u do add , update , delete ,  or toggle, update the localStorage

  useEffect(() => {
    localStorage.setItem("tasks",JSON.stringify(tasks))
  },[tasks])

  return (
    <>
      <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-4">To-Do App</h1>
        <div className="flex gap-2 mb-4">
          {/*   INPUT ROWS */}
          <input
            value={newTasks}
            className="flex-grow border p-2 rounded"
            placeholder="Enter Your Tasks"
            type="text"
            onChange={handleInputChange} //& will be event=>setNewTask(event.target.value)
          />

          {/* BUTTON TRIGGERS AND HANDLER */}
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        {/* Task list */}
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center mb-2 p-2 border-b"
            >
              {editingId === task.id ? (
                <div className="flex gap-2 w-full">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-grow border p-1 rounded"
                  />
                  <button
                    className="bg-green-500 text-white px-2 rounded"
                    onClick={() => saveEdit(task.id)}
                  >
                    Save
                  </button>
                  <button
                    onClick={cancleEdit}
                    className="bg-gray-400 text-white px-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span
                    onClick={() => handleToggelTask(task.id)}
                    className={`flex-grow cursor-pointer ${
                      task.completed ? "line-through text-gray-600" : ""
                    }`}
                  >
                    {task.text}
                  </span>
                  <button
                    onClick={() => startEditing(task)}
                    className="ml-2 text-blue-500"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="ml-2 text-red-500"
                  >
                    {" "}
                    ❌
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App