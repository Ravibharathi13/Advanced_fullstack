const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    foodname: { type: String, required: true },
    days: { type: Number, required: true }
});

const FoodModel = mongoose.model("foods", FoodSchema);
module.exports = FoodModel;
