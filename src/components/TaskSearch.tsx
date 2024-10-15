import React, { useState, useContext, useCallback } from "react";
import { TaskContext } from "../TaskContext";

function debounce<T extends unknown[]>(
  func: (...args: T) => void,
  delay: number
): (...args: T) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (...args: T): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

const TaskSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const context = useContext(TaskContext);

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (context) {
        context.searchTasks(searchQuery);
      }
    }, 300),
    [context]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search"
        className="w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-600"
      />
    </div>
  );
};

export default TaskSearch;
