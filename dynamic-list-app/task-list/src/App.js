import React, { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [subtaskInputs, setSubtaskInputs] = useState({});

  const addTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      title: task,
      date: date,
      subtasks: []
    };

    setTasks([...tasks, newTask]);
    setTask("");
    setDate("");
  };

  const handleSubtaskInput = (index, value) => {
    setSubtaskInputs({
      ...subtaskInputs,
      [index]: value
    });
  };

  const addSubtask = (index) => {
    const subtask = subtaskInputs[index];
    if (!subtask) return;

    const updated = [...tasks];
    updated[index].subtasks.push(subtask);

    setTasks(updated);

    setSubtaskInputs({
      ...subtaskInputs,
      [index]: ""
    });
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div className="container">

      <h1>To Doo Tasks</h1>

      <div className="inputBox">

        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={addTask}>Add Task</button>

      </div>

      <div className="taskList">

        {tasks.map((t, index) => (

          <div className="taskCard" key={index}>

            <h3>Task {index + 1}: {t.title}</h3>

            <p>📅 Date: {t.date}</p>

            <b>Subtasks:</b>

            <ul>
              {t.subtasks.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>

            <input
              type="text"
              placeholder="Enter subtask"
              value={subtaskInputs[index] || ""}
              onChange={(e) =>
                handleSubtaskInput(index, e.target.value)
              }
            />

            <button onClick={() => addSubtask(index)}>
              Add Subtask
            </button>

            <button onClick={() => deleteTask(index)}>
              Delete Task
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;