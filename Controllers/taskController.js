const Task = require('../Models/task');

const createTask = async (req, res) => {
    try {

        const { title, description, user } = req.body;

        if (!title || !user || !description) {
            return res.status(400).json({ success: false, message: 'Title and User are required' });
        }

        const task = await Task.create(req.body);
        res.status(201).json({ success: true, message: 'Task created successfully', task });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// get all tasks by user
const getAllTasks = async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await Task.find({ user: userId });
        res.status(200).json({ success: true, message: 'Tasks found successfully', tasks });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// get a single task by id
const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, message: 'Task found successfully', task });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// update a task by id
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, user, dueDate, priority, label, subtasks } = req.body;
        const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, message: 'Task updated successfully', task });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// delete a task by id
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Add lebles to task
const addLabelsToTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { labels } = req.body;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        task.labels.push(...labels);
        await task.save();
        res.status(200).json({ success: true, message: 'Labels added to task successfully', task });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// remove lebles to task
const removeLabelsFromTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { labels } = req.body;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        task.labels = task.labels.filter(label => !labels.includes(label));
        await task.save();
        res.status(200).json({ success: true, message: 'Labels removed from task successfully', task });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask };
