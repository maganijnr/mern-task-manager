const express = require("express");
const {
	createTask,
	getAllTasks,
	getSingleTask,
	deleteTask,
	updateTask,
	updateTaskProperty,
} = require("../controllers/taskController");
const router = express.Router();

router.route("/").get(getAllTasks).post(createTask);

router
	.route("/:id")
	.get(getSingleTask)
	.delete(deleteTask)
	.put(updateTask)
	.patch(updateTaskProperty);

// router.post("/", createTask);
// router.get("/", getAllTasks);
// router.get("/:id", getSingleTask);
// router.delete("/:id", deleteTask);
// router.put("/:id", updateTask);

//If you have a model that has several properties and you just want to update one property, use PATCH
// router.patch("/:id", updateTaskProperty);

module.exports = router;
