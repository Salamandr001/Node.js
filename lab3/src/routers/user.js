// routers/user.js

const express = require('express');
const User = require('../models/user');
const router = new express.Router();

// Отримання всіх користувачів
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

// Отримання користувача за ID
router.get('/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

// Додавання нового користувача
router.post('/', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    console.error(e);
    res.status(400).send(e.message);
  }
});

// Оновлення користувача за ID
router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});

// Видалення користувача за ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

// Видалення всіх користувачів
router.delete('/', async (req, res) => {
  try {
    await User.deleteMany({});
    res.send({ message: 'All users deleted' });
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

module.exports = router;

// const user = new User({
//   name: ' gosha mona ',
//   email: 'yasdasdasgamal.com',
//   password: '12345678k',
//   age: 19
// });


// user.save()
//   .then(() => {
//       console.log(user); // Успішне збереження
//   })
//   .catch((error) => {
//       console.log('Error:', error.message); // Обробка помилки
//   });
  