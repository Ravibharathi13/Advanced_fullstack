const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false }
});

const Task = mongoose.model("Task_data", TaskSchema);
module.exports = Task;