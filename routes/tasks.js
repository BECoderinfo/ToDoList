const express = require('express');
const router = express.Router();

const { 
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask

 } = require('../Controllers/taskController');

router.post('/create', createTask);
router.get('/getall/:userId', getAllTasks);
router.get('/get/:id', getTaskById);
router.put('/update/:id', updateTask);
router.delete('/delete/:id', deleteTask);

module.exports = router;