const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'In Progress'],
        default: 'Pending'
    },
}, {timestamps: true});

module.exports = mongoose.model('Subtask', subtaskSchema);