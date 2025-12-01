const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const taskRoutes = require("./routes/tasks");

const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI
).then(() => console.log("MongoDB Atlas connected"))
.catch(err => console.log(err));



app.use("/api/tasks", taskRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
