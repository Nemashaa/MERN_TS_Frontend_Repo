import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

// Define Todo type
interface Todo {
  todoId?: number;
  id?: number; // JSONPlaceholder uses "id", MongoDB uses "todoId"
  userId?: number | string;
  title: string;
  completed: boolean;
}

const fetchTodos = async (): Promise<Todo[]> => {
  const { data }: AxiosResponse<Todo[]> = await axios.get('/api/todos', { withCredentials: true });
  return data;
};

export const useFetchData = () => {
  return useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });
};
