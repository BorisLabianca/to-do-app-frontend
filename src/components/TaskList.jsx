import { useState, useEffect } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../App";
import loader from "../assets/loader.gif";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskID] = useState("");
  const [formData, setFormData] = useState({ name: "", completed: false });
  const { name } = formData;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api/tasks/all-tasks`);
      setTasks(data);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getTasks();
  }, []);

  const createTask = async (event) => {
    event.preventDefault();
    if (name === "") {
      return toast.error("Input field cannot be empty.");
    }
    try {
      const response = await axios.post(`${URL}/api/tasks/add-tasks`, formData);
      setFormData({ ...formData, name: "" });
      getTasks();
      toast.success("Task added successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/tasks/delete/${id}`);
      getTasks();
      toast.success("Task deleted successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getSingleTask = async (task) => {
    try {
      setFormData({ name: task.name, completed: false });
      setTaskID(task._id);
      setIsEditing(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateTask = async (event) => {
    event.preventDefault();
    if (name === "") {
      return toast.error("Input field connot be empty 2.");
    }
    try {
      const response = await axios.put(
        `${URL}/api/tasks/update/${taskID}`,
        formData
      );
      console.log(response);
      setFormData({ ...formData, name: "" });
      setIsEditing(false);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const setTaskToComplete = async (task) => {
    const newFormData = {
      name: task.name,
      completed: !task.completed,
    };
    try {
      await axios.put(`${URL}/api/tasks/update/${task._id}`, newFormData);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const compTask = tasks.filter((task) => {
      return task.completed === true;
    });
    setCompletedTasks(compTask);
  }, [tasks]);

  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />
      <div className="--flex-between --pb">
        <p>
          <b>Total Tasks: {`${tasks.length}`}</b>
        </p>
        <p>
          <b>Completed Tasks: {`${completedTasks.length}`}</b>
        </p>
      </div>
      <hr />
      {isLoading && (
        <div className="--flex-center">
          <img src={loader} alt="Loading" />
        </div>
      )}
      {!isLoading && tasks.length === 0 ? (
        <p className="--py">
          No tasks in your drawer. Please add a task to do.
        </p>
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
                setTaskToComplete={setTaskToComplete}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default TaskList;
