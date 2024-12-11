const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
    taskId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    },
    title: {
        type: String,
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending'
    },
}, {timestamps: true});

module.exports = mongoose.model('Subtask', subtaskSchema);