import React from "react";

const TaskForm = ({
	name,
	handleInputChange,
	createTask,
	isEditting,
	updateTask,
}) => {
	return (
		<form
			className="task-form"
			onSubmit={isEditting ? updateTask : createTask}
		>
			<input
				type="text"
				placeholder="Add a task"
				name="name"
				value={name}
				onChange={handleInputChange}
			/>
			<button type="submit">{isEditting ? "Edit" : "Add"}</button>
		</form>
	);
};

export default TaskForm;
