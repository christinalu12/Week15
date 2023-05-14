import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed} // Checkbox checked status based on todo's completion
        onChange={onToggle} // Toggle the completion status of the todo
      />
      <span>{todo.title}</span> {/* Display the title of the todo */}
      <button onClick={handleDelete}>Delete</button> {/* Button to delete the todo */}
    </li>
  );
};

export default TodoItem;
