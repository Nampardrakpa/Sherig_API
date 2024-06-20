const express = require('express');
const router = express.Router();
const threadController = require('./threadController');

// Route to create a new thread
router.post('/api/new', threadController.createThread);

// Route to retrieve messages within a specific thread
router.get('/api/threads/:thread_id', threadController.getThreadMessages);

// Route to post a new message within a specific thread
router.post('/api/threads/:thread_id', threadController.postThreadMessage);

// Route to run the assistant
router.post('/api/assistant/run/:thread_id', threadController.runAssistant);

// Export the router
module.exports = router;
