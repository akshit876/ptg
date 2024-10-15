import { useState, useCallback, useContext } from 'react';
import { TaskContext } from '../TaskContext';


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

export function useDebounceSearch(delay: number = 300) {
  const [query, setQuery] = useState('');
  const context = useContext(TaskContext);

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (context) {
        context.searchTasks(searchQuery);
      }
    }, delay),
    [context, delay]
  );

  const handleInputChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
    debouncedSearch(newQuery);
  }, [debouncedSearch]);

  return {
    query,
    handleInputChange
  };
}
