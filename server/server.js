var express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const notesRouter = require("./routes/noteRoutes");
const usersRouter = require("./routes/userRoutes");

require("dotenv").config();

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
const connection = mongoose.connection;
connection.on("open", () => {
	console.log("MongoDB database connection established successfully!");
});
connection.on("error", (err) => {
	console.log(`Error connecting to MongoDB: ${err}`);
});

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
