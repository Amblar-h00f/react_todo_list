import React, { useState } from "react";

function TodoItem({ todo, dispatch }) {
    const [editText, setEditText] = useState(todo.text);

    const handleSave = (e) => {
        e.preventDefault();
        dispatch({
            type: 'SAVE_EDIT',
            id: todo.id,
            newText: editText
        });
    };

    if (todo.isEditing) {
        return (
            <li className={`todo-item${todo.completed ? " completed" : ""}`}>
                <form onSubmit={handleSave} style={{ display: "inline" }}>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        autoFocus
                    />
                    <button type="submit">Save</button>
                </form>
            </li>
        );
    }

    return (
        <li className={`todo-item${todo.completed ? " completed" : ""}`}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch({ type: 'TOGGLE_COMPLETE', id: todo.id })}
            />
            <span className="todo-text">{todo.text}</span>
            <button onClick={() => dispatch({ type: 'START_EDIT', id: todo.id })}>
                Edit
            </button>
            <button onClick={() => dispatch({ type: 'DELETE_TODO', id: todo.id })}>
                Delete
            </button>
        </li>
    );
}

export default TodoItem;