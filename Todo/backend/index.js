const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3001;
const JWT_SECRET = 'your_jwt_secret';

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://root:root@cluster0.jnqtbkt.mongodb.net/TodoJWT')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// User Schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);


const TodoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const Todo = mongoose.model('Todo', TodoSchema);

// JWT Middleware
const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if (!token) return res.status(403).send("Token required");
    
    token = token.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send("Invalid Token");
        req.userId = decoded.userId;
        next();
    });
};


app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, password: hashedPassword });
        res.status(201).send('User Registered Successfully');
    } catch {
        res.status(400).send('Username already exists');
    }
});

// Login API
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(401).json({ message: 'Invalid username or password' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
});



app.post('/api/todo', verifyToken, async (req, res) => {
    const { title, description } = req.body;
    await Todo.create({ title, description, user: req.userId });
    res.status(201).send("Todo created");
});



app.get('/api/readtodo', verifyToken, async (req, res) => {
    const todos = await Todo.find({ user: req.userId });
    res.json(todos);
});



app.put('/api/updatetodo/:id', verifyToken, async (req, res) => {
    const { title, description, completed } = req.body;
    await Todo.findOneAndUpdate(
        { _id: req.params.id, user: req.userId },
        { title, description, completed }
    );
    res.send("Todo updated");
});

// Delete Todo
app.delete('/api/deletetodo/:id', verifyToken, async (req, res) => {
    await Todo.findOneAndDelete({ _id: req.params.id, user: req.userId });
    res.send("Todo deleted");
});



app.listen(port, () =>
    console.log(`🚀 Server running at http://localhost:${port}`)
);
