const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reminderTime: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Reminder', ReminderSchema);
