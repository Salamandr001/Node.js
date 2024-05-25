const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routers/user"); // Підключення роутера для користувачів
const taskRouter = require("./routers/task"); // Підключення роутера для завдань
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;


mongoose.connect('mongodb://127.0.0.1:27017/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to the database'))
    .catch(error => console.error('Connection error', error));

app.use(express.json());


app.use("/users", userRouter);


app.use("/tasks", taskRouter);


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});