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

	useEffect(() => {
		getTasks();
	}, []);

	return (
		<div>
			<h2>Task Manager</h2>
			<TaskForm
				name={name}
				handleInputChange={handleInputChange}
				createTask={createTask}
			/>
			<div className="--flex-between --pb">
				<p>
					<b>Total Tasks:</b> {tasks.length}
				</p>

				<p>
					<b>Completed Tasks:</b> 0
				</p>
			</div>
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
							/>
						);
					})}
				</>
			)}
		</div>
	);
};

export default TaskList;
