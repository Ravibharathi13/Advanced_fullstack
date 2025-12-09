const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const TaskModel = require('./model/Task'); 

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("✔ MongoDB Connected Successfully"))
    .catch(err => console.log("❌ MongoDB Connection Error:", err));

// Create Task (POST)
app.post('/insert', async (req, res) => {
    const { title, description } = req.body;
    try {
        const task = new TaskModel({ title, description });
        await task.save();
        res.status(201).send("Task created successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error creating task");
    }
});

app.get('/read', async (req, res) => {
    try {
        const tasks = await TaskModel.find({});
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);     
        res.status(500).send("Error reading tasks");
    }
});



// Start server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
