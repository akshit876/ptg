import React, { useContext } from 'react';
import { TaskContext } from '../TaskContext';
import { FilterType } from '../types';

const TaskFilter: React.FC = () => {
  const context = useContext(TaskContext);

  if (!context) return null;

  const { filter, setFilter } = context;

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  return (
    <div className="mb-4 flex space-x-2">
      {['all', 'completed', 'incomplete'].map((f) => (
        <button
          key={f}
          onClick={() => handleFilterChange(f as FilterType)}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            filter === f
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition-colors duration-200`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
