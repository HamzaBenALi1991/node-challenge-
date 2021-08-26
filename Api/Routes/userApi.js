const express = require("express");
const router = express.Router();
// use the model 
const User = require('../models/usermodel');


// get all users 
router.get('/', async (req,res)=>{
    try {
        const users = await User.find({}).populate("todos" ,"title"); 
        res.json(users);

      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error!" });
      }
});
// get todo by id
router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!" });
    }
  });
// create todo
router.post("/", async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!" });
    }
  });
  // update todo
router.put("/:id", async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!" });
    }
  });
  // delete todo
  router.delete("/:id", async (req, res) => {
    try {
      const user = await User.findByIdAndRemove(req.params.id);
      res.json({ message: "todo has been deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!" });
    }
  });
  // affect todo to user 
  router.put('/affect-todo/:iduser/:idtodo',async(req,res)=>{
    try {
      const user = await User.findByIdAndUpdate(req.params.iduser, {$push:{todos :req.params.idtodo}}, {
        new: true,
      });
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!" });
    }
  });
  
  // desafecte todo from user 
  router.put('/desaffect-todo/:iduser/:idtodo',async(req,res)=>{
    try {
      const user = await User.findByIdAndUpdate(req.params.iduser, {$pull:{todos :req.params.idtodo}}, {
        new: true,
      });
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!" });
    }
  });

  
 
module.exports = router;