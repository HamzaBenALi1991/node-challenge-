const express = require("express");
const router = express.Router();
// use the model
const Todo = require("../models/todosmodel");

// get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({});
    if (todos) {
      res.json({
        count: todos.length,
        todos: todos.map((doc) => {
          return {
            title: doc.title,
            description: doc.description,
            TodosId: doc._id,

            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
            url: "http://localhost:3000/todos/" + doc._id,
          };
        }),
      });
    } else {
      res.status(200).json({
        message: " no data to show the data base is empty .",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
});
// get todo by id
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo) {
      res.json({
        message : "todo has been fetched . ",
        todo : todo ,
        url: "http://localhost:3000/todos/" + todo._id,

      });
    } else {
      res.status(404).json({
        message: "no match ID in the DATA BASE .",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!", error: error });
  }
});

// create todo
router.post("/", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(500).json({
      message: " todo has been added to data base .",
      todoCreated: {
        todo :todo , 
        url: "http://localhost:3000/todos/" + todo._id,
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!", error: error });
  }
});
// update todo
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (todo) {
      res.json({
        message: "todos has been updated .",
        todo: todo,
      });
    } else {
      res.status(404).json({
        message: "you can not update a todo that does not exist .",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error!", error: error.message });
  }
});
// delete todo
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndRemove(req.params.id);
    if (todo) {
      res.json({ message: "todo has been deleted successfully" });
    } else {
      res.status(404).json({
        message: "You can not delete a todo that does not exist .",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
});

module.exports = router;
