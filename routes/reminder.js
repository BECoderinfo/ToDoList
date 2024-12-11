const express = require('express');
const router = express.Router();
const { create, getAll, deleteReminder} = require('../Controllers/reminderController');

router.post('/create', create);
router.get('/getall/:userId', getAll);
router.delete('/delete/:id', deleteReminder);

module.exports = router