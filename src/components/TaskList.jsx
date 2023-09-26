import Task from "./Task";
import TaskForm from "./TaskForm";

const TaskList = () => {
  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm />
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
