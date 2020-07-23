const express = require("express");
require("./db/mongoose");
const User = require("./models/User");
const Task = require("./models/Task");
const { ObjectID } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// -------- USERS --------
app.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }

  //   user
  //     .save()
  //     .then(() => res.status(201).send(user))
  //     .catch((err) => res.status(400).send(err));
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }

  //   User.find({})
  //     .then((users) => res.send(users))
  //     .catch(() => res.status(500).send());
});

app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(500).send;
  }

  //   User.findById(_id)
  //     .then((user) => {
  //       if (!user) {
  //         return res.status(404).send();
  //       }

  //       res.send(user);
  //     })
  //     .catch(() => res.status(500).send());
});

app.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "age", "email", "password"];
  const isValidUpdate = updates.every((key) => allowedUpdates.includes(key));
  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(400).send();
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// -------- TASKS --------
app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
  //   task
  //     .save()
  //     .then(() => res.status(201).send(task))
  //     .catch((err) => res.status(400).send(err));
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (err) {
    res.status(500).send();
  }

  //   Task.find({})
  //     .then((tasks) => res.send(tasks))
  //     .catch(() => res.status(500).send());
});

app.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }

  //   Task.findById(_id)
  //     .then((task) => {
  //       if (!task) {
  //         return res.status(404).send();
  //       }

  //       res.send(task);
  //     })
  //     .catch(() => res.status(500).send());
});

app.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "completed"];
  const isValidUpdate = updates.every((upd) => allowedUpdates.includes(upd));
  if (!isValidUpdate) {
    return res.status(400).send();
  }
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete("/tasks/:id", async (req, res) => {
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

// -------------
app.listen(port, () => console.log("Server is up on port " + port));
