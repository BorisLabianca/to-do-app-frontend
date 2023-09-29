import { FaEdit, FaCheckDouble, FaRegTrashAlt } from "react-icons/fa";

const Task = ({
  task,
  index,
  deleteTask,
  getSingleTask,
  setTaskToComplete,
}) => {
  return (
    <div className={task.completed === true ? "task completed" : "task"}>
      <p>
        <b>{index + 1}. </b>
        {task.name}
      </p>
      <div className="task-icons">
        <FaCheckDouble color="green" onClick={() => setTaskToComplete(task)} />
        <FaEdit color="purple" onClick={() => getSingleTask(task)} />
        <FaRegTrashAlt color="red" onClick={() => deleteTask(task._id)} />
      </div>
    </div>
  );
};

export default Task;
