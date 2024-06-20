const { OpenAI } = require('openai');
require('dotenv').config(); // Load environment variables

// Retrieve OPENAI_API_KEY and ASSISTANT_ID_KEY from environment variables
const { OPENAI_API_KEY, ASSISTANT_ID_KEY } = process.env;

// Initialize OpenAI instance with API key and Assistant ID
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    assistantId: ASSISTANT_ID_KEY
});

// Function to create a new thread
const createThread = async (req, res) => {
  try {
    // Call OpenAI API to create a new thread
    const thread = await openai.beta.threads.create();
    // Respond with the newly created thread
    res.status(201).json(thread);
  } catch (error) {
    console.error('Error creating thread:', error);
    res.status(500).json({ error: 'Could not create thread' });
  }
};

// Function to retrieve messages within a specific thread
const getThreadMessages = async (req, res) => {
  const { thread_id } = req.params;
  try {
    // Call OpenAI API to retrieve messages for the specified thread
    const messages = await openai.beta.threads.messages.list(thread_id);
    // Respond with the messages
    res.json(messages);
  } catch (error) {
    console.error('Error retrieving messages for thread:', error);
    res.status(500).json({ error: 'Could not retrieve messages' });
  }
};

// Function to post a new message within a specific thread
const postThreadMessage = async (req, res) => {
  const { thread_id } = req.params;
  const { content } = req.body;
  try {
    // Call OpenAI API to post a new message to the specified thread
    const message = await openai.beta.threads.messages.create(thread_id, {
      role: 'user',
      content,
    });
    // Respond with the newly created message
    res.status(201).json(message);
  } catch (error) {
    console.error('Error posting message to thread:', error);
    res.status(500).json({ error: 'Could not post message' });
  }
};

// Function to run the assistant
const runAssistant = async (req, res) => {
  const { thread_id } = req.params;
  const assistant_id = process.env.ASSISTANT_ID_KEY; // Retrieve assistant_id from environment variables
  
  try {
    // Run the assistant with the retrieved assistant_id
    const run = await openai.beta.threads.runs.create(thread_id, {
      assistant_id: assistant_id
    });
    
    // Respond with the run details
    res.status(200).json(run);
  } catch (error) {
    console.error('Error running assistant:', error);
    res.status(500).json({ error: 'Could not run assistant' });
  }
};

module.exports = {
  createThread,
  getThreadMessages,
  postThreadMessage,
  runAssistant,
};
