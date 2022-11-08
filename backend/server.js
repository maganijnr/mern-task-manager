const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const taskRoutes = require("./routes/taskRoutes");
const app = express();

dotenv.config();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
	try {
		await connectDB();
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	} catch (error) {
		console.log(error && error.message);
	}
};

startServer();
