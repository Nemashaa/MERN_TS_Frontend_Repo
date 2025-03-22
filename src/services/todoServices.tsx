import axios from 'axios';

export const getTodos = async () => {
  const { data } = await axios.get('/api/todos', { withCredentials: true });
  return data;
};

export const createTodo = async (title: string) => {
  const { data } = await axios.post('/api/todos', { title }, { withCredentials: true });
  return data;
};

export const updateTodo = async (id: number, title: string, completed: boolean) => {
  const { data } = await axios.put(`/api/todos/${id}`, { title, completed }, { withCredentials: true });
  return data;
};

export const deleteTodo = async (id: number) => {
  await axios.delete(`/api/todos/${id}`, { withCredentials: true });
};
