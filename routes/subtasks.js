const express = require('express');
const router = express.Router();

const {
    createSubtask, 
    getSubtasksByTaskId, 
    getSubtaskById, 
    updateSubtaskById, 
    deleteSubtaskById
    
} = require('../Controllers/subtaskController');

router.post('/create', createSubtask);
router.get('/getall/:taskId', getSubtasksByTaskId);
router.get('/get/:id', getSubtaskById);
router.put('/update/:id', updateSubtaskById);
router.delete('/delete/:id', deleteSubtaskById);

module.exports = router