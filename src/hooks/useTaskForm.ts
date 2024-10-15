import { useState, useContext, useCallback } from 'react';
import { TaskContext } from '../TaskContext';

export function useTaskForm() {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const context = useContext(TaskContext);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      if (context) {
        context.addTask(title.trim());
        setTitle('');
        setError('');
      }
    } else {
      setError('Task cannot be empty');
    }
  }, [context, title]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (error) {
      setError('');
    }
  }, [error]);

  return {
    title,
    error,
    handleSubmit,
    handleInputChange
  };
}
