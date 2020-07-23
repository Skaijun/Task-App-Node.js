// -------- TASKS --------
const express = require("express");
const Task = require("../models/Task");
const User = require("../models/User");
const router = express.Router();

router.post("/tasks", async (req, res) => {
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

router.get("/tasks", async (req, res) => {
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

router.get("/tasks/:id", async (req, res) => {
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

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "completed"];
  const isValidUpdate = updates.every((upd) => allowedUpdates.includes(upd));
  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    //     const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //       new: true,
    //       runValidators: true,
    //     });
    const task = await Task.findById(req.params.id);
    updates.forEach((upd) => (task[upd] = req.body[upd]));
    await task.save();

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/tasks/:id", async (req, res) => {
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

module.exports = router;
