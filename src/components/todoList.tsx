import React, { useEffect, useState } from 'react';
import useTodoStore from '../store/todoStore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TodoList() {
  const { todos, fetchTodos, addTodo, editTodo, removeTodo } = useTodoStore();
  const [newTodoTitle, setNewTodoTitle] = useState('');

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = () => {
    if (newTodoTitle.trim()) {
      addTodo(newTodoTitle); // Call the addTodo function from the store
      setNewTodoTitle(''); // Clear the input field after adding
    }
  };

  return (
    <div>
      <h2>Todos</h2>

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

      {/* Todos List */}
      <button onClick={fetchTodos} className="refresh-btn">Refresh</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.todoId}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => editTodo(todo.todoId, todo.title, !todo.completed)}
            />
            {todo.title}
            <button onClick={() => removeTodo(todo.todoId)} className="delete-btn">Delete</button>
          </li>
        ))}
      </ul>

      {/* Toast Container for showing notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}
