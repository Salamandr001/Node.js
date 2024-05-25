const express = require('express');
const Task = require('../models/task');
const router = new express.Router();

// Отримання всіх задач
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send();
  }
});

// Отримання задачі за ID
router.get('/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

// Додавання нової задачі
router.post('/', async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Оновлення задачі за ID
router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['title', 'description', 'completed'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Видалення задачі за ID
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

// Видалення всіх задач
router.delete('/', async (req, res) => {
  try {
    await Task.deleteMany({});
    res.send({ message: 'All tasks deleted' });
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
// const task = new Task({
//   title: '  My Task  ',
//   description: '  kor tasktask-manager-api.  ',
// });

// task.save()
//   .then(() => {
//       console.log(task); // Успішне збереження
//   })
//   .catch((error) => {
//       console.log('Error:', error.message); // Обробка помилки
//   });
