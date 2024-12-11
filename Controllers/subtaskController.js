const Subtask = require('../Models/subtask');
const Task = require('../Models/task');

const createSubtask = async (req, res) => {
    try {

        const { description, title, taskId } = req.body;

        if (!description || !title) {
            return res.status(400).json({
                success: false,
                message: 'Description and Title are required'
            });
        }

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        const subtask = await Subtask.create(req.body);

        task.subtasks.push(subtask._id);
        await task.save();

        res.status(201).json({ 
            success: true, 
            message: 'Subtask created successfully', 
            subtask 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

// get all subtasks by task ID
const getSubtasksByTaskId = async (req, res) => {
    try {
        const { taskId } = req.params;
        const subtasks = await Subtask.find({taskId});
        res.status(200).json({ success: true, message: 'Subtasks found successfully', subtasks });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// get a single subtask by ID
const getSubtaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const subtask = await Subtask.findById(id);
        if (!subtask) {
            return res.status(404).json({ success: false, message: 'Subtask not found' });
        }
        res.status(200).json({ success: true, message: 'Subtask found successfully', subtask });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// update a subtask by ID
const updateSubtaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const subtask = await Subtask.findByIdAndUpdate(id, req.body, { new: true });
        if (!subtask) {
            return res.status(404).json({ 
                success: false, 
                message: 'Subtask not found' 
            });
        }
        res.status(200).json({ 
            success: true, 
            message: 'Subtask updated successfully', 
            subtask 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message
        });
    }
};

// status update
const updateSubtaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const subtask = await Subtask.findByIdAndUpdate(id, { status }, { new: true });
        if (!subtask) {
            return res.status(404).json({ success: false, message: 'Subtask not found' });
        }
        res.status(200).json({ success: true, message: 'Subtask updated successfully', subtask });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// delete a subtask by ID
const deleteSubtaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const subtask = await Subtask.findByIdAndDelete(id);

        const task = await Task.findById(subtask.taskId);
        task.subtasks.pull(id);
        await task.save();

        if (!subtask) {
            return res.status(404).json({ 
                success: false, 
                message: 'Subtask not found' 
            });
        }
        res.status(200).json({ 
            success: true, 
            message: 'Subtask deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message 
        });
    }
};

module.exports = { createSubtask, getSubtasksByTaskId, getSubtaskById, updateSubtaskById, deleteSubtaskById, updateSubtaskStatus };