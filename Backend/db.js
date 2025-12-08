const mongoose = require('mongoose');

const uri='mongodb+srv://root:root@cluster0.jnqtbkt.mongodb.net/'
mongoose.connect(uri)

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully");
});
