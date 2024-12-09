const Task = require('../Models/task');

const createTask = async (req, res) => {
    try {

        const { title, description, user, dueDate } = req.body;
        if (!title || !user || !description || !dueDate) {
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
        const tasks = await Task.find({ user: userId, isArchived: false });

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
        const { title, description, dueDate } = req.body;
        if (req.body.user || req.body.label) {
            return res.status(400).json({
                success: false,
                message: 'UserId and Label cannot be updated'
            });
        }

        const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
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
        const { label } = req.body;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        task.label = label;
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
        // const { label } = req.body;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        task.label = undefined;
        await task.save();
        res.status(200).json({ success: true, message: 'Labels removed from task successfully', task });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get all tasks by user and label
const getTasksByUserAndLabel = async (req, res) => {
    try {
        const { userId, labelId } = req.params;
        const tasks = await Task.find({
            user: userId,
            labels: labelId
        });
        res.status(200).json({
            success: true,
            message: 'Tasks found successfully',
            tasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

//Helper function to escape regular expressions
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Search Task by title width user ID
const searchTask = async (req, res) => {
    try {
        const { userId, query } = req.params;
        const regex = new RegExp(escapeRegExp(query), 'i');
        const task = await Task.find({ user: userId, title: { $regex: regex } });
        res.status(200).json({
            success: true,
            message: 'Task found successfully',
            task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// filter data by label
const filterTaskbyLabel = async (req, res) => {
    try {
        const { userId, labelId } = req.params;
        const task = await Task.find({ user: userId, label: labelId }).populate('label');
        res.status(200).json({
            success: true,
            message: 'Task found successfully',
            task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// filter note by Due Date
const filterTaskbyDueDate = async (req, res) => {
    try {
        const { userId, dueDate } = req.params;
        const task = await Task.find({ user: userId, dueDate: dueDate });
        res.status(200).json({
            success: true,
            message: 'Task found successfully',
            task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

//filter by status
const filterTaskbyStatus = async (req, res) => {
    try {
        const { userId, status } = req.params;
        const task = await Task.find({ user: userId, status: status });
        res.status(200).json({
            success: true,
            message: 'Task found successfully',
            task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// staus update
const updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const task = await Task.findByIdAndUpdate(id, { status }, { new: true });
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, message: 'Task updated successfully', task });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// reOpen task
const reopenTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ 
                success: false, 
                message: 'Task not found' 
            });
        }

        task.isReOpen = !task.isReOpen;
        task.status = 'In Progress'; 
        await task.save();

        res.status(200).json({ success: true, message: 'Task re-opened successfully', task });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// get reOpen tasks by user
const getReOpenTasks = async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await Task.find({ user: userId, isReOpen: true });
        res.status(200).json({ success: true, message: 'Re-opened tasks found successfully', tasks });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

//archive task
const archiveTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        task.isArchived = !task.isArchived;
        await task.save();
        res.status(200).json({ success: true, message: 'Task archived successfully', task });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// get archived tasks by user
const getArchivedTasks = async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await Task.find({ 
            user: userId, 
            isArchived: true 
        });
        res.status(200).json({ 
            success: true, 
            message: 'Archived tasks found successfully', 
            tasks 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

// Prioritized tasks
const prioritizeTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ 
                success: false, 
                message: 'Task not found' 
            });
        }
        task.isPrioritized = !task.isPrioritized;
        await task.save();
        res.status(200).json({ 
            success: true, 
            message: 'Task prioritized successfully', 
            task 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

// get prioritized tasks by user
const getPrioritizedTasks = async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await Task.find({ 
            user: userId, 
            isPrioritized: true 
        });
        res.status(200).json({ 
            success: true, 
            message: 'Prioritized tasks found successfully', 
            tasks 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    addLabelsToTask,
    filterTaskbyDueDate,
    filterTaskbyStatus,
    updateTaskStatus,
    reopenTask,
    archiveTask,
    getArchivedTasks,
    prioritizeTask,
    getPrioritizedTasks,
    getTasksByUserAndLabel,
    searchTask,
    filterTaskbyLabel,
    getReOpenTasks,
    removeLabelsFromTask,
};
