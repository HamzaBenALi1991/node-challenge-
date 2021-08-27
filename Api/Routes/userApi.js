const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
// use the model
const User = require("../models/usermodel");
const Todos = require("../models/todosmodel");

// get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}).populate("todos", "title");
    if (users) {
      res.json({
        count: users.length,
        user: users.map((user) => {
          return {
            user: user,
            url: "http://localhost:3000/users/" + user._id,
          };
        }),
      });
    } else {
      res.status(200).json({
        message: "there is no users to get Data from .",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
});
// get user  by id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "todos",
      "title description"
    );
    if (user) {
      res.json({
        user: user,
        url: "http://localhost:3000/users/" + user._id,
      });
    } else {
      res.status(500).json({
        message: "there is no user with this ID",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error!", error: error.message });
  }
});
// create todo
router.post("/", async (req, res) => {
  try {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      try{
        if (err) {
          return res.status(500).json({
            error: err,
          });
        } else {
          const todo = await Todos.findById(req.body.todos);
          if (todo != null || req.body.todos == null) {
            const user = await User.create({
              firstname: req.body.firstname,
              email: req.body.email,
              password: hash,
              todos: req.body.todos,
              age: req.body.age,
            });
  
            res.json({
              message: "user has been created .",
              user: user,
              url: "http://localhost:3000/users/" + user._id,
            });
          } else {
            res.status(422).json({
              message: "the todos ID does not match anything in the database . ",
            });
          }
        }
      }catch(error){
        console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error!", error: error.message });
      }
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error!", error: error.message });
  }
});
// update todo
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (user) {
      res.json({
        message: "user has been updated .",
        newUserInfos: user,
      });
    } else {
      res.status(404).json({
        message:
          " there is no user with this ID to update .please check ID again .",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
});
// delete todo
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (user) {
      res.json({ message: "todo has been deleted successfully" });
    } else {
      res.status(404).json({
        message: "there is no user with thus ID so you can delete it .",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
});
// affect todo to user
router.put("/affect-todo/:iduser/:idtodo", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.iduser,
      { $push: { todos: req.params.idtodo } },
      {
        new: true,
      }
    );
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
});

// desafecte todo from user
router.put("/desaffect-todo/:iduser/:idtodo", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.iduser,
      { $pull: { todos: req.params.idtodo } },
      {
        new: true,
      }
    );
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
});

module.exports = router;
