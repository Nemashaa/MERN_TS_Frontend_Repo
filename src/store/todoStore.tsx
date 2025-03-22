import { create } from 'zustand';
import { toast } from 'react-toastify';
import { getTodos, createTodo, updateTodo, deleteTodo } from "../services/todoServices";

interface Todo {
  todoId: number;
  title: string;
  completed: boolean;
}

interface TodoStore {
  todos: Todo[];
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  editTodo: (id: number, title: string, completed: boolean) => Promise<void>;
  removeTodo: (id: number) => Promise<void>;
}

const useTodoStore = create<TodoStore>((set) => ({
  todos: [],

  fetchTodos: async () => {
    const todos = await getTodos();
    set({ todos });
  },

  addTodo: async (title) => {
    const newTodo = await createTodo(title);
    set((state) => ({ todos: [...state.todos, newTodo] }));
    toast.success('✅ New task created!'); // Show success toast
  },

  editTodo: async (id, title, completed) => {
    const updatedTodo = await updateTodo(id, title, completed);
    set((state) => ({
      todos: state.todos.map((todo) => (todo.todoId === id ? updatedTodo : todo)),
    }));
    toast.success('✏️ Task updated successfully!'); // Show success toast
  },

  removeTodo: async (id) => {
    await deleteTodo(id);
    set((state) => ({
      todos: state.todos.filter((todo) => todo.todoId !== id),
    }));
    toast.success('🗑️ Task deleted successfully!'); // Show success toast
  },
}));

export default useTodoStore;
