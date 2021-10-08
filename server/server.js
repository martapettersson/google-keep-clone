var express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.on("open", () => {
	console.log("MongoDB database connection established successfully!");
});
connection.on("error", (err) => {
	console.log(`Error connecting to MongoDB: ${err}`);
});

const notesRouter = require("./routes/notes");
app.use("/api/notes", notesRouter);

const userRouter = require("./routes/user");
app.use("/user", userRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
