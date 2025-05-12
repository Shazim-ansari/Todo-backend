const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const cors = require("cors");
const app = express();
const router = require("./src/router/index");
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// mongoose connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB error:", err));

app.use(router);

app.get("/", (req, res) => {
    res.status(200).send("Hello World I Am Running");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port} — Good Start, Shazim`);
});

