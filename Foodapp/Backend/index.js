const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const FoodModel = require('./models/Food');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("✔ MongoDB Connected Successfully"))
    .catch(err => console.log("❌ MongoDB Connection Error:", err));

// Insert Food Item
app.post('/insert', async (req, res) => {
    const { foodName, daysSinceIAte } = req.body;

    try {
        const food = new FoodModel({ foodName, daysSinceIAte });
        await food.save();
        res.status(201).send("Food item inserted successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error inserting food item");
    }
});

// Read Food Items
app.get('/read', async (req, res) => {
    try {
        const foodItems = await FoodModel.find({});
        res.status(200).json(foodItems);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error reading food items");
    }
});

// Update Food Item
app.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const  newFoodName  = req.body.newFoodName;

    try {
         await FoodModel.findByIdAndUpdate(
            id,
            { foodName: newFoodName },
            { new: true})
            res.status(200).send("Food item updated successfully");
        } catch (error) {
        console.log(error);
        res.status(500).send("Error updating food item");
    }
});

// Delete Food Item
app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await FoodModel.findByIdAndDelete(id);
        res.status(200).send("Food item deleted successfully");
    } catch (error) {
        res.status(500).send("Error deleting food item");
    }
});

// Server Start
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
