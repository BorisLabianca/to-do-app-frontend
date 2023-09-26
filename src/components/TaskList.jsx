import { useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import { toast } from "react-toastify";
import axios from "axios";

const TaskList = () => {
  const [formData, setFormData] = useState({ name: "", completed: false });
  const { name } = formData;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const createTask = async (event) => {
    event.preventDefault();
    if (name === "") {
      return toast.error("Input field cannot be empty.");
    }
    try {
      const response = await axios.post(
        "http://localhost:4000/api/tasks/add-tasks",
        formData
      );
      setFormData({ ...formData, name: "" });
      toast.success("Task added successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

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
          <b>Total Tasks:</b>
        </p>
        <p>
          <b>Completed Tasks:</b>
        </p>
      </div>
      <hr />
      <Task />
    </div>
  );
};

export default TaskList;
