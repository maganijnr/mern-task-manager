const Task = require("../model/taskModel");

async function getAllTasks(req, res) {
	try {
		const tasks = await Task.find().sort({ createdAt: -1 });

		return res.status(200).json(tasks);
	} catch (error) {
		if (error && error.message) {
			return res.status(400).json({ message: "Can't get all tasks" });
		}
	}
}

async function createTask(req, res) {
	const { name } = req.body;

	try {
		if (name === "") {
			return res.status(400).json({ message: "Task is required" });
		}

		const taskExist = await Task.findOne({ name: name });

		if (taskExist) {
			return res.status(400).json({ message: "Task is already exist" });
		}

		const task = await Task.create({ name: name });

		return res.status(201).json(task);
	} catch (error) {
		if (error && error.message) {
			return res.status(400).json({ message: "Can't create task" });
		}
	}
}

async function getSingleTask(req, res) {
	try {
		const taskId = req.params.id;
		const task = await Task.findById(taskId);

		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}

		return res.status(200).json(task);
	} catch (error) {
		if (error && error.message) {
			return res.status(400).json({ message: "Task not found" });
		}
	}
}

async function deleteTask(req, res) {
	try {
		const taskId = req.params.id;
		const task = await Task.findByIdAndDelete(taskId);

		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}
		return res.status(200).json({ message: "Task deleted successfully" });
	} catch (error) {
		if (error && error.message) {
			return res.status(400).json({ message: "Task not found" });
		}
	}
}

async function updateTask(req, res) {
	try {
		const taskId = req.params.id;

		const task = await Task.findByIdAndUpdate({ _id: taskId }, req.body, {
			new: true,
			//For the validators to run
			runValidators: true,
		});

		if (!task) {
			return res.status(404).json({ message: "Task does not exist" });
		}

		return res.status(200).json(task);
	} catch (error) {
		if (error && error.message) {
			return res.status(400).json({ message: error.message });
		}
	}
}

async function updateTaskProperty(req, res) {
	try {
		const taskId = req.params.id;

		const task = await Task.findByIdAndUpdate({ _id: taskId }, req.body, {
			new: true,
			//For the validators to run
			runValidators: true,
		});

		if (!task) {
			return res.status(404).json({ message: "Task does not exist" });
		}

		return res.status(200).json(task);
	} catch (error) {
		if (error && error.message) {
			return res.status(400).json({ message: "Unable to update" });
		}
	}
}

module.exports = {
	getAllTasks,
	createTask,
	getSingleTask,
	deleteTask,
	updateTask,
	updateTaskProperty,
};
