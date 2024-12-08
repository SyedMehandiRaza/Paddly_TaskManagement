const router = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");
const {authenticateToken} = require("./auth")

// Create Task
// router.post("/create-task",authenticateToken, async (req, res) => {

//   try {

//     // Create a new task
//     const { title, desc } = req.body;
//     const { id } = req.headers;
//     console.log("Request Headers:", req.headers);
//     console.log("Request Body:", req.body);

//     if (!title || !desc || !id) {
//         return res.status(400).json({ message: "Missing required fields (title, desc, or id)" });
//       }
//     const newTask = new Task({ title: title, desc: desc });
//     const saveTask = await newTask.save();
//     const taskId = saveTask._id;

//     // Link the task to the user
//     await User.findByIdAndUpdate(id, { $push: { tasks: taskId._id } });

//     res.status(200).json({ message: "Task Created" });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: "Internal Server Error" });
//   }
// });
router.post("/create-task", authenticateToken, async (req, res) => {
  try {
    const { title, desc } = req.body;
    const { id } = req.headers;
    const newTask = new Task({ title:title, desc:desc });
    const saveTask = await newTask.save();
    const taskId = saveTask._id;

    await User.findByIdAndUpdate(id, { $push: { tasks: taskId._id } });

    res.status(200).json({ message: "Task Created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get("/get-all-tasks", authenticateToken, async (req, res) => {
    const { id } = req.headers; // Assuming user ID is passed in headers
  
    try {
      const userData = await User.findById(id).populate({
        path: "tasks",
        options: { sort: { createdAt: -1}}
      });
  
  
      res.status(200).json({ data: userData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

  router.delete("/delete-task/:id", authenticateToken, async (req, res) => {
    const { id } = req.params; // Task ID from URL parameter
    const userId = req.headers.id; // User ID from headers
  
    try {
      await Task.findByIdAndDelete(id);
      await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });
  
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  router.put("/update-task/:id", authenticateToken, async (req, res) => {
    const { id } = req.params; // Task ID from URL parameter
    const { title, desc } = req.body; // Updated task details
    try {
      await Task.findByIdAndUpdate(id,{ title: title, desc: desc });
      res.status(200).json({ message: "Task updated successfully", updatedTask });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Internal Server Error" });
    }
  });

  router.put("/update-imp-task/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params; // Task ID from URL parameter
        const TaskData = await Task.findById(id);
        const ImpTask = TaskData.important;
      await Task.findByIdAndUpdate(id,{ important: !ImpTask });
      res.status(200).json({ message: "Task updated successfully", updatedTask });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Internal Server Error" });
    }
  });

  router.put("/update-complete-task/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params; // Task ID from URL parameter
        const TaskData = await Task.findById(id);
        const CompleteTask = TaskData.complete;
      await Task.findByIdAndUpdate(id,{ complete: !CompleteTask });
      res.status(200).json({ message: "Task updated successfully", updatedTask });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Internal Server Error" });
    }
  });
  
  router.get("/get-imp-tasks", authenticateToken, async (req, res) => {
   
    try {
        const { id } = req.headers; // Assuming user ID is passed in headers
  
      const Data = await User.findById(id).populate({
        path: "tasks",
        match:{important :true},
        options: { sort: { createdAt: -1}}
      });
  const ImpTaskData = Data.tasks;
  
      res.status(200).json({ data: ImpTaskData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  router.get("/get-complete-tasks", authenticateToken, async (req, res) => {
   
    try {
        const { id } = req.headers; // Assuming user ID is passed in headers
  
      const Data = await User.findById(id).populate({
        path: "tasks",
        match:{complete :true},
        options: { sort: { createdAt: -1}}
      });
  const CompleteTask = Data.tasks;
  
      res.status(200).json({ data: CompleteTask });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  router.get("/get-incomplete-tasks", authenticateToken, async (req, res) => {
   
    try {
        const { id } = req.headers; // Assuming user ID is passed in headers
  
      const Data = await User.findById(id).populate({
        path: "tasks",
        match:{complete :false},
        options: { sort: { createdAt: -1}}
      });
  const CompleteTask = Data.tasks;
  
      res.status(200).json({ data: CompleteTask });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
module.exports = router;

