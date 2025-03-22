import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import useAuthStore from "../store/authStore";
import { useFetchData } from '../hooks/useFetchData';
import useTodoStore from '../store/todoStore';
import '../styles/Dashboard.css';

interface Todo {
  todoId?: number;  // Optional `todoId`
  id?: number;      // Optional `id` (for JSONPlaceholder)
  title: string;
  completed: boolean;
}

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { data: todos, isLoading, isError } = useFetchData();
  const { addTodo, editTodo, removeTodo } = useTodoStore(); // Use Zustand for add, edit, and remove todos
  const navigate = useNavigate();

  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [updatingTodo, setUpdatingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleAddTodo = () => {
    if (newTodoTitle.trim()) {
      addTodo(newTodoTitle);
      setNewTodoTitle('');
    }
  };

  const handleUpdateTodo = () => {
    if (updatingTodo && updatingTodo.title.trim()) {
      editTodo(updatingTodo.todoId!, updatingTodo.title, updatingTodo.completed);
      setUpdatingTodo(null); // Reset after updating
    }
  };

  if (isLoading) {
    return <MainLayout><div>Loading...</div></MainLayout>;
  }

  if (isError) {
    return <MainLayout><div>Error loading data</div></MainLayout>;
  }

  return (
    <MainLayout>
      <div className="dashboard-page">
        <h1>Dashboard</h1>
        {user && <h2>Hi {user.name}!</h2>}

        {/* Add Todo Section */}
        <div className="add-task">
          <input
            type="text"
            placeholder="New Todo"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)} // Update state with the input value
            className="task-input"
          />
          <button onClick={handleAddTodo} className="add-btn">Add Todo</button>
        </div>

        {/* Update Todo Section */}
        {updatingTodo && (
          <div className="update-task">
            <input
              type="text"
              value={updatingTodo.title}
              onChange={(e) => setUpdatingTodo({ ...updatingTodo, title: e.target.value })}
              className="task-input"
            />
            <button onClick={handleUpdateTodo} className="add-btn">Update Todo</button>
          </div>
        )}

        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Completed</th>
              <th>Actions</th> {/* Added actions column for update and delete */}
            </tr>
          </thead>
          <tbody>
            {todos?.map((todo: Todo) => (
              <tr key={todo.todoId ?? todo.id}>
                <td>{todo.todoId ?? todo.id ?? 'N/A'}</td>
                <td>{todo.title}</td>
                <td>{todo.completed ? '✅' : '❌'}</td>
                <td>
                  <button
                    className="update-btn"
                    onClick={() => setUpdatingTodo(todo)} // Set the todo to be updated
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      const id = todo.todoId ?? todo.id;
                      if (id) {
                        removeTodo(id); // Call removeTodo with the valid ID
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
