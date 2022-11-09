import React from "react";

const TaskForm = ({ name, handleInputChange, createTask }) => {
	return (
		<form className="task-form" onSubmit={createTask}>
			<input
				type="text"
				placeholder="Add a task"
				name="name"
				value={name}
				onChange={handleInputChange}
			/>
			<button type="submit">Add</button>
		</form>
	);
};

export default TaskForm;
