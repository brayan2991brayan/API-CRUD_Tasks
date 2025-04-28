const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the To-Do API!');
});

module.exports = app;
