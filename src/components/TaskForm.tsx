import React from "react";
import { useTaskForm } from "../hooks/useTaskForm";

const TaskForm: React.FC = () => {
  const { title, error, handleSubmit, handleInputChange } = useTaskForm();

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={title}
        onChange={handleInputChange}
        placeholder="Type something"
        className={`w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-green-600`}
      />
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
