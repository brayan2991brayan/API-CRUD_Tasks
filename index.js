const express = require('express');
const app = express();
const port = 3000;

// Read the JSON with express
app.use(express.json());

// Temporal: Create on the fly
let tasks = [];

// Home Route
app.get('/', (req, res) => {
  res.send('Welcome to the to Do app!');
});

app.post('/tasks', (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'The title is mandatory' });
  
    const newTask = {
      id: tasks.length + 1,
      title,
      completed: false,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  });
  
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    const task = tasks.find(t => t.id == id);

    if (!task) return res.status(404).json({ error: 'Task was not found' });
    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;
  
    res.json(task);
  });

  app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(t => t.id != id);
    res.status(204).send();
  });
  
  
// The server is listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
