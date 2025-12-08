const express = require('express');
const mongoose = require('mongoose');
const Food = require('./models/Food');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://root:root@cluster0.jnqtbkt.mongodb.net/');
