const Reminder = require('../Models/reminder');
const Task = require('../Models/task');

const create = async (req, res) => {
    try {
        const { reminderTime, taskId } = req.body;
        const task = await Task.findById(taskId)        
        if (!task) return res.status(404).json({ message: 'Task not found' });

        if (!reminderTime || isNaN(new Date(reminderTime))){
            return res.status(400).json({ message: 'Invalid reminder time' });
        }

        console.log(task.dueDate);
        

        if (new Date(reminderTime) > new Date(task.dueDate)){
            return res.status(400).json({ message: 'Reminder time cannot be greater to task time' });
        }
        const reminder = await Reminder.create({
            taskId,
            reminderTime: new Date(reminderTime),
            userId: task.user
        });

        res.status(201).json({
            message: 'Reminder set successfully',
            reminder
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error : error.message });
    }
};


const getAll = async (req, res) => {
    const userId = req.params.userId;
    
    try {
        const reminders = await Reminder.find({ userId }).populate('taskId', 'name');

        res.status(200).json({
            reminders: reminders.map((r) => ({
                id: r._id,
                taskId: r.taskId._id,
                taskName: r.taskId.name,
                reminderTime: r.reminderTime
            }))
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


const deleteReminder = async (req, res) => {
    const { id } = req.params;

    try {
        const reminder = await Reminder.findByIdAndDelete(id);
        if (!reminder) return res.status(404).json({ message: 'Reminder not found' });

        res.status(200).json({ message: 'Reminder deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    create,
    getAll,
    deleteReminder
};
