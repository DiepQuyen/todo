import React, { useState } from 'react';

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);

    const handleDoubleClick = () => setIsEditing(true);
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            updateTodo(todo.id, { ...todo, title });
            setIsEditing(false);
        }
    };

    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => updateTodo(todo.id, { ...todo, completed: !todo.completed })}
            />
            {isEditing ? (
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            ) : (
                <span onDoubleClick={handleDoubleClick}>{todo.title}</span>
            )}
            <button onClick={() => deleteTodo(todo.id)}>Xóa</button>
        </li>
    );
};

export default TodoItem;