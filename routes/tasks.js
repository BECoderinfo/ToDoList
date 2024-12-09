const express = require('express');
const router = express.Router();

const { 
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
    filterTaskbyLabel,
    searchTask,
    getReOpenTasks,
    removeLabelsFromTask

 } = require('../Controllers/taskController');

// task
router.post('/create', createTask);
router.get('/getall/:userId', getAllTasks);
router.get('/get/:id', getTaskById);
router.put('/update/:id', updateTask);
router.delete('/delete/:id', deleteTask);

// status update 
router.put('/updatestatus/:id', updateTaskStatus);

// labels
router.put('/addlabels/:id', addLabelsToTask);
router.put('/removelabels/:id', removeLabelsFromTask);

// filter 
router.get('/filterbystatus/:userId/:status', filterTaskbyStatus);
router.get('/filterbyduedate/:userId/:dueDate', filterTaskbyDueDate);
router.get('/filterbylabel/:userId/:labelId', filterTaskbyLabel);
router.get('/search/:userId/:query', searchTask);

// status update
router.put('/updatestatus/:id', updateTaskStatus);

// reopen task
router.put('/reopentask/:id', reopenTask);
router.get('/getreopenedtasks/:userId', getReOpenTasks);

// archive task
router.put('/archive/:id', archiveTask);
router.get('/getarchivedtasks/:userId', getArchivedTasks);

// prioritize task
router.put('/prioritize/:id', prioritizeTask);
router.get('/getprioritizedtasks/:userId', getPrioritizedTasks);



module.exports = router;