const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Tasks working");
});

// Dummy data
let tasks = [
  { id: 1, title: "Learn Node", completed: false },
  { id: 2, title: "Build API", completed: false }
];


// ✅ GET all tasks
router.get("/", (req, res) => {
  res.json(tasks);
});


// ✅ GET single task
router.get("/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (task) res.json(task);
  else res.status(404).json({ message: "Task not found" });
});


// ✅ CREATE task
router.post("/", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});


// ✅ UPDATE task
router.put("/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (task) {
    task.title = req.body.title || task.title;
    task.completed = req.body.completed ?? task.completed;
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});


// ✅ DELETE task
router.delete("/:id", (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;