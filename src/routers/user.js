const express = require("express");
require("../db/mongoose");
const sharp = require("sharp");
const User = require("../db/models/user");
const router = new express.Router();
const multer = require("multer");
const auth = require("../middleware/auth");
const {
  sendWelcomeEmail,
  sendCancellationEmail
} = require("../emails/account");
router.get("/test", (req, res) => {
  res.send("From a file");
});
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    sendWelcomeEmail(user.email, user.nmae);
    const token = await user.generateAuthToken();
    const userObject = user.toObject();
    delete userObject["password"];
    delete userObject["tokens"];
    res.status(200).send({ user: userObject, token });
  } catch (e) {
    res.status(400).send(e);
  }
});
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const userObject = user.toObject();
    delete userObject["password"];
    delete userObject["tokens"];
    delete userObject["avatar"];
    const token = await user.generateAuthToken();
    res.status(200).send({ user: userObject, token });
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowed = ["name", "email", "password", "age"];
  const isValid = updates.every(update => {
    return allowed.includes(update);
  });
  if (!isValid) {
    return res.status(400).send({ error: "Invalid Update" });
  }
  try {
    // const user = await User.findById(req.params.id);
    updates.forEach(update => {
      req.user[update] = req.body[update];
    });
    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.send(202).send(e);
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    _id = req.params.id;
    user = await User.findById(_id);

    if (!user) {
      return res.status(404).send();
    }
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    sendCancellationEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

const upload = multer({
  limit: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  }
});

router.post(
  "/users/me/avatars",
  auth,
  upload.single("avatars"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/users/me/avatars", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set("Content-type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});
module.exports = router;
