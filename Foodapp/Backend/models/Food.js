const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    foodName: { type: String, required: true },
    daysSinceIAte: { type: Number, required: true }
});

const FoodModel = mongoose.model("foods", FoodSchema);
module.exports = FoodModel;
