import React from 'react';
import { useDebounceSearch } from '../hooks/useDebounceSearch';

const TaskSearch: React.FC = () => {
  const { query, handleInputChange } = useDebounceSearch();

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Search"
        className="w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-600"
      />
    </div>
  );
};

export default TaskSearch;
