const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dueDate: {
        type: Date
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'In Progress'],
        default: 'Pending'
    },
    label: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Label'
    },
    subtasks: [{
        title: {
            type: String
        },
        status: {
            type: String,
            enum: ['Pending', 'Completed'],
            default: 'Pending'
        },
    }],
    isArchived: {
        type: Boolean,
        default: false
    },
    reOpen: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
