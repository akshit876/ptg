import React, { useContext } from "react";
import { TaskContext } from "../TaskContext";

const TaskList: React.FC = () => {
  const context = useContext(TaskContext);

  if (!context) return null;

  const { toggleTask, deleteTask, filter, filterTasks } = context;

  const filteredTasks = filterTasks(filter);

  return (
    <ul className="space-y-2 mb-4">
      {filteredTasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center bg-gray-50 p-3 rounded-lg"
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
            className="mr-3 h-5 w-5 text-green-600 rounded focus:ring-green-500"
          />
          <span
            className={`flex-grow ${
              task.completed ? "line-through text-gray-400" : "text-gray-700"
            }`}
          >
            {task.title}
          </span>
          <button
            onClick={() => deleteTask(task.id)}
            className="ml-2 text-gray-400 hover:text-red-500 focus:outline-none"
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
