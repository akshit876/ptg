import React, { useState, useContext } from "react";
import { TaskContext } from "../TaskContext";

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const context = useContext(TaskContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      if (context) {
        context.addTask(title.trim());
        setTitle("");
        setError("");
      }
    } else {
      setError("Task cannot be empty");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (error) {
      setError("");
    }
  };

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
