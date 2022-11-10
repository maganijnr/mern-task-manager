const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const taskRoutes = require("./routes/taskRoutes");
const app = express();
const cors = require("cors");

dotenv.config();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	cors({
		origin: ["http://localhost:3000"],
	})
);

// {
// 		origin: ["http://localhost:3000/"],
// 	}
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
