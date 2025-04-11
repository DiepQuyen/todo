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

    // Kiểm tra nếu quá hạn và chưa hoàn thành
    const isOverdue = () => {
        if (todo.completed || !todo.deadline) return false;
        const now = new Date();
        const deadline = new Date(todo.deadline);
        return now > deadline;
    };

    // Định dạng thời gian đến hạn
    const formatDeadline = (deadline) => {
        if (!deadline) return 'Không có hạn';
        const date = new Date(deadline);
        return `Hạn: ${date.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })}`;
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
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span onDoubleClick={handleDoubleClick}>{todo.title}</span>
                    <span style={{ fontSize: '14px', color: '#777' }}>
                        {formatDeadline(todo.deadline)}
                    </span>
                    {isOverdue() && (
                        <span style={{ color: 'red', fontSize: '16px' }}>
                            Chưa hoàn thành
                        </span>
                    )}
                </div>
            )}
            <button onClick={() => deleteTodo(todo.id)}>X</button>
        </li>
    );
};

export default TodoItem;