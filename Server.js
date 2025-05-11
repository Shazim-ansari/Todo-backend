const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express();
const router = require("./src/router/index");
const port = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())


mongoose
    // .connect("mongodb://localhost:27017/todo-app")
    .connect("mongodb+srv://shazim:shazim123@cluster0.i4a0d.mongodb.net/todo-app")
    .then(() => console.log("MongoDB connection successful"))
    .catch((err) => console.log("MongoDB error:", err));
    
app.use(router);


app.get("/", (req, res) => {
    res.status(200).send("Hello World I Am Running");
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port} — Good Start, Shazim`);
});
