let tasks = [];

const getAllTasks = (req, res) => {
  res.status(200).json(tasks);
};

const createTask = (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Title is required and must be a string.' });
  }

  const newTask = {
    id: tasks.length + 1,
    title: title.trim(),
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const task = tasks.find(task => task.id === parseInt(id, 10));

  if (!task) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  if (title !== undefined) {
    if (typeof title !== 'string') {
      return res.status(400).json({ error: 'Title must be a string.' });
    }
    task.title = title.trim();
  }

  if (completed !== undefined) {
    if (typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'Completed must be a boolean.' });
    }
    task.completed = completed;
  }

  res.status(200).json(task);
};

const deleteTask = (req, res) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex(task => task.id === parseInt(id, 10));

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
