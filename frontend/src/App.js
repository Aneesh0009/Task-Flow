import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch all tasks
  const loadTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Add task
  const addTask = async () => {
    if (!title.trim()) return;
    await axios.post("http://localhost:5000/api/tasks", { title });
    setTitle("");
    loadTasks();
  };

  // Toggle task status
  const toggleTask = async (id, completed) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, { completed: !completed });
    loadTasks();
  };

  // Delete task
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    loadTasks();
  };

  return (
    <div className="container">
      <h2>TaskFlow – Task Manager</h2>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter task..."
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <span 
              onClick={() => toggleTask(task._id, task.completed)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer"
              }}
            >
              {task.title}
            </span>
            <button onClick={() => deleteTask(task._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
