const express = require('express');
const jwt = require('jsonwebtoken');    
const mongoose = require('mongoose');
const cors = require('cors');   

mongoose.connect('mongodb+srv://root:root@cluster0.jnqtbkt.mongodb.net/JWT'); 