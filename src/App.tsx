import React from "react";
import { TaskProvider } from "./TaskContext";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm"; 
import TaskFilter from "./components/TaskFilter";
import TaskSearch from "./components/TaskSearch";

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gradient-to-br from-green-300 to-green-500 p-4 sm:p-6 lg:p-8 flex justify-center items-center">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white rounded-3xl shadow-xl p-6 sm:p-8">
          <h1 className="text-2xl font-bold mb-6">Today</h1>
          <TaskSearch />
          <TaskFilter />
          <TaskList />
          <TaskForm />
        </div>
      </div>
    </TaskProvider>
  );
};

export default App;
