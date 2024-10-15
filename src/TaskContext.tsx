import React, { createContext, useState, useEffect, useCallback } from "react";
import { Task, FilterType } from "./types";

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  filterTasks: (filter: FilterType) => Task[];
  searchTasks: (query: string) => void;
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  searchQuery: string;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((title: string) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now().toString(), title, completed: false },
    ]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  const filterTasks = useCallback(
    (filter: FilterType) => {
      return tasks.filter((task) => {
        const matchesFilter = 
          filter === 'all' || 
          (filter === 'completed' && task.completed) || 
          (filter === 'incomplete' && !task.completed);
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
      });
    },
    [tasks, searchQuery]
  );

  const searchTasks = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        filterTasks,
        searchTasks,
        filter,
        setFilter,
        searchQuery,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
