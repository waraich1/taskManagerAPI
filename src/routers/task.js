const express = require("express");
require("../db/mongoose");
const Task = require("../db/models/task");
const router = new express.Router();
const auth = require("../middleware/auth");
router.post("/tasks", auth, async (req, res) => {
  try {
    // const task = new Task(req.body);
    const task = new Task({
      ...req.body,
      owner: req.user._id
    });
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/task/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowed = ["completed", "task"];
  const isValid = updates.every(update => allowed.includes(update));
  if (!isValid) {
    res.status(404).send({ error: "Cannot figure out what to update" });
  }
  try {
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   runValidators: true,
    //   new: true
    // });

    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!task) {
      return res.sendStatus(404).send({ error: "Cannot update" });
    }
    updates.forEach(update => {
      task[update] = req.body[update];
    });
    await task.save();

    res.send(task);
  } catch (e) {
    return res.sendStatus(202).send(e);
  }
});

router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort: {
            createdAt: -1
          }
        }
      })
      .execPopulate();
    res.status(201).send(req.user.tasks);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }

  console.log(req.params);
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!task) {
      return res
        .status(500)
        .send({ error: "There is no record found to be deleted " });
    }
    await task.remove();
    res.status(200).send(task);
  } catch (e) {
    return res.status(500).send({ error: "There is an error" });
  }
});

module.exports = router;
