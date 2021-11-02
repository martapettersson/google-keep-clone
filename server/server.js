const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const notesRouter = require("./routes/noteRoutes");
const usersRouter = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const { connection } = mongoose;
connection.on("error", (err) => {
  console.warn(`Error connecting to MongoDB: ${err}`);
});

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);

app.listen(port);
