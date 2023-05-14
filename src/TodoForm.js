import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

// Create endpoint for API
const TODO_ENDPOINT = 'https://jsonplaceholder.typicode.com/todos';

const TodoList = () => {
  const [todos, setTodos] = useState([]); // State to store the todos
  const [newTodo, setNewTodo] = useState(''); // State to store the new todo input

  useEffect(() => {
    // Fetch todos from the API
    fetch(TODO_ENDPOINT)
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => console.log(error));
  }, []);

  const handleInputChange = (event) => {
    // Update the new todo input value
    setNewTodo(event.target.value);
  };

  const handleAddTodo = (newTodoItem) => {
    // Add a new todo to the list
    setTodos(prevTodos => [...prevTodos, newTodoItem]);
  };

  const handleToggleTodo = (id) => {
    // Toggle the completion status of a todo
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    // Delete a todo from the list
    fetch(`${TODO_ENDPOINT}/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="container"> {/* Container for the todo list */}
      <h1>Todo List</h1> {/* Heading for the todo list */}

      <div className="todo-form"> {/* Container for the todo form */}
        <TodoForm onSubmit={handleAddTodo} /> {/* Todo form component */}
      </div>

      <ul> {/* Container for the todo items */}
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => handleToggleTodo(todo.id)}
            onDelete={() => handleDeleteTodo(todo.id)}
          />
        ))} {/* Todo item components */}
      </ul>
    </div>
  );
};

export default TodoList;

