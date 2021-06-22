const express = require("express");
const UsersData = require("../Data/UsersData");

const router = express.Router();

// get all users
router.get("/", (req, res) => {
  res.status(200).json(UsersData);
});

// get user by id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const user = UsersData.filter((data) => data.id === parseInt(id))[0];

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400).json({ message: `No User Found in This User ID:${id}` });
  }
});

// add user
router.post("/", (req, res) => {
  const newUser = {
    id: UsersData.length + 1,
    name: req.body.name,
    email: req.body.email,
  };
  if (!newUser.name || !newUser.email) {
    return res.status(200).json({ message: "Please include a Name and Email" });
  }
  UsersData.push(newUser);
  res.json(newUser);
  // res.redirect("/");
});

// update user by id
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const user = UsersData.filter((data) => data.id === parseInt(id))[0];
  const updUser = req.body;

  if (user) {
    user.name = updUser.name ? updUser.name : user.name;
    user.email = updUser.email ? updUser.email : user.email;
    res.json(user);
  } else {
    res.status(200).json({ message: `No User Found in This User ID:${id}` });
  }
});

// delete user
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const user = UsersData.filter((data) => data.id === parseInt(id))[0];

  if (user) {
    const filteredUsers = UsersData.filter((users) => users.id !== user.id);
    res.json({ message: "This User was Deleted Successfully", filteredUsers });
  } else {
    res.status(200).json({ message: `No User Found in This User ID:${id}` });
  }
});

module.exports = router;
