import React, { useEffect, useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../App";
import LoadingImage from "../assets/loader.gif";

const TaskList = () => {
	const [tasks, setTasks] = useState([]);
	const [completedTasks, setCompletedTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isEditting, setIsEditting] = useState(false);
	const [taskId, setTaskId] = useState("");

	const [formData, setFormData] = useState({
		name: "",
		completed: false,
	});

	const { name } = formData;

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const createTask = async (event) => {
		event.preventDefault();

		if (name === "") {
			return toast.error("Input field required");
		}

		try {
			await axios.post(`${URL}/api/tasks/`, formData);

			toast.success("Task has been added successfully");
			setFormData({ ...formData, name: "" });
			getTasks();
		} catch (error) {
			toast.error(error.message);
		}
	};

	const getTasks = async () => {
		setIsLoading(true);

		try {
			const { data } = await axios.get(`${URL}/api/tasks`);

			setTasks(data);
			setIsLoading(false);
		} catch (error) {
			toast.error(error.message);
			setIsLoading(false);
		}
	};

	const deleteTask = async (id) => {
		try {
			await axios.delete(`${URL}/api/tasks/${id}`);
			toast.success(`Task deleted successfully`);
			getTasks();
		} catch (error) {
			toast.error(error.message);
		}
	};

	const getSingleTask = async (task) => {
		setFormData({
			name: task.name,
			completed: false,
		});
		setTaskId(task._id);
		setIsEditting(true);
	};

	const updateTask = async (event) => {
		event.preventDefault();

		if (name === "") {
			return toast.error("Input field required");
		}

		try {
			await axios.put(`${URL}/api/tasks/${taskId}`, formData);

			toast.success("Task successfully updated");
			setFormData({ ...formData, name: "" });
			setIsEditting(false);
			setTaskId("");
			getTasks();
		} catch (error) {
			toast.error(error.message);
		}
	};

	const setToComplete = async (task) => {
		const newFormData = {
			name: task.name,
			completed: true,
		};
		try {
			await axios.put(`${URL}/api/tasks/${task._id}`, newFormData);
			toast.success("Task successfully updated");
			getTasks();
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		getTasks();
	}, []);

	useEffect(() => {
		const completed = tasks.filter((task) => {
			return task.completed === true;
		});

		setCompletedTasks(completed);
	}, [tasks]);

	return (
		<div>
			<h2>Task Manager</h2>
			<TaskForm
				name={name}
				handleInputChange={handleInputChange}
				createTask={createTask}
				isEditting={isEditting}
				updateTask={updateTask}
			/>
			{tasks.length > 0 && (
				<div className="--flex-between --pb">
					<p>
						<b>Total Tasks:</b> {tasks.length}
					</p>

					<p>
						<b>Completed Tasks:</b> {completedTasks.length}
					</p>
				</div>
			)}
			<hr />
			{isLoading && (
				<div className="--flex-center">
					<img src={LoadingImage} alt="gif" />
				</div>
			)}
			{!isLoading && Boolean(!tasks.length) ? (
				<p className="--py">No tasks available. Please add a task</p>
			) : (
				<>
					{tasks.map((task, index) => {
						return (
							<Task
								key={task._id}
								task={task}
								index={index}
								deleteTask={deleteTask}
								getSingleTask={getSingleTask}
								setToComplete={setToComplete}
							/>
						);
					})}
				</>
			)}
		</div>
	);
};

export default TaskList;
