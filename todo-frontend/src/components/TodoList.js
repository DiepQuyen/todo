import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [newDeadline, setNewDeadline] = useState(''); // Thêm state cho deadline
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get('http://localhost:8080/api/todos');
        setTodos(response.data);
    };

    const addTodo = async (e) => {
        if (e.key === 'Enter' && newTodo.trim()) {
            const response = await axios.post('http://localhost:8080/api/todos', {
                title: newTodo,
                completed: false,
                deadline: newDeadline || null, // Gửi deadline lên server
            });
            setTodos([...todos, response.data]);
            setNewTodo('');
            setNewDeadline(''); // Reset deadline sau khi thêm
        }
    };

    const updateTodo = async (id, updatedTodo) => {
        const response = await axios.put(`http://localhost:8080/api/todos/${id}`, updatedTodo);
        setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
    };

    const deleteTodo = async (id) => {
        await axios.delete(`http://localhost:8080/api/todos/${id}`);
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const clearCompleted = async () => {
        await axios.delete('http://localhost:8080/api/todos/completed');
        setTodos(todos.filter((todo) => !todo.completed));
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'Active') return !todo.completed;
        if (filter === 'Completed') return todo.completed;
        return true;
    });

    return (
        <div className="todo-container">
            <div className="todo-header">
                <h1>todos</h1>
            </div>
            <div style={{ display: 'flex', gap: '10px', padding: '0 20px' }}>
                <input
                    className="todo-input"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyDown={addTodo}
                    placeholder="What needs to be done?"
                    style={{ flex: 1 }}
                />
                <input
                    type="datetime-local"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    style={{ padding: '10px', fontSize: '16px', border: 'none', borderBottom: '1px solid #ededed' }}
                />
            </div>
            <ul className="todo-list">
                {filteredTodos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        updateTodo={updateTodo}
                        deleteTodo={deleteTodo}
                    />
                ))}
            </ul>
            {todos.length > 0 && (
                <div className="todo-footer">
                    <span>{todos.filter((todo) => !todo.completed).length} item left</span>
                    <div className="filters">
                        <button
                            className={filter === 'All' ? 'active' : ''}
                            onClick={() => setFilter('All')}
                        >
                            All
                        </button>
                        <button
                            className={filter === 'Active' ? 'active' : ''}
                            onClick={() => setFilter('Active')}
                        >
                            Active
                        </button>
                        <button
                            className={filter === 'Completed' ? 'active' : ''}
                            onClick={() => setFilter('Completed')}
                        >
                            Completed
                        </button>
                    </div>
                    <button className="clear-completed" onClick={clearCompleted}>
                        Clear completed
                    </button>
                </div>
            )}
        </div>
    );
};

export default TodoList;