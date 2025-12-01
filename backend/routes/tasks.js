const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// GET all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
});

// ADD a task
router.post("/", async (req, res) => {
    try {
        const { title } = req.body;
        if (!title || !title.trim()) return res.status(400).json({ error: "Title is required" });
        const newTask = new Task({ title: title.trim() });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        console.error("Error creating task:", err);
        res.status(500).json({ error: "Failed to create task" });
    }
});

// UPDATE a task
router.put("/:id", async (req, res) => {
    try {
        const { completed } = req.body;
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { completed },
            { new: true }
        );
        if (!task) return res.status(404).json({ error: "Task not found" });
        res.json(task);
    } catch (err) {
        console.error("Error updating task:", err);
        res.status(500).json({ error: "Failed to update task" });
    }
});

// DELETE a task
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Task.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Task not found" });
        res.json({ message: "Task deleted" });
    } catch (err) {
        console.error("Error deleting task:", err);
        res.status(500).json({ error: "Failed to delete task" });
    }
});

module.exports = router;
