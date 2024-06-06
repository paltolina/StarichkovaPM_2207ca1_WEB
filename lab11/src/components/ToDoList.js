import React, { useState, useEffect } from 'react';

function TodoList() {
    const [todoItems, setTodoItems] = useState([]);
    const [newItemText, setNewItemText] = useState('');

    useEffect(() => {
        loadList();
    }, []);

    useEffect(() => {
        saveList();
    }, [todoItems]);

    const saveList = () => {
        localStorage.setItem("todoList", JSON.stringify(todoItems));
    }

    const loadList = () => {
        const savedList = localStorage.getItem("todoList");
        if (savedList) {
            setTodoItems(JSON.parse(savedList));
        }
    }

    const addItem = () => {
        if (newItemText.trim() !== "") {
            const newItem = {
                id: Date.now(),
                text: newItemText,
                completed: false
            };
            setTodoItems([...todoItems, newItem]);
            setNewItemText('');
        }
    }

    const clearItem = (id) => {
        const updatedList = todoItems.filter(item => item.id !== id);
        setTodoItems(updatedList);
    }

    const clearAll = () => {
        setTodoItems([]);
    }

    return (
        <div>
            <section>
                <h2>To-do list</h2>
                <div className="content-item">
                    <input
                        type="text"
                        value={newItemText}
                        onChange={(e) => setNewItemText(e.target.value)}
                        placeholder="New element"
                    />
                    <button className="add-button" onClick={addItem}>Add</button>
                    <button className="clear-all-button" onClick={clearAll}>Clear</button>
                </div>
                <dl>
                    {todoItems.map(item => (
                        <div key={item.id} className="content-item">
                            <input
                                type="checkbox"
                                checked={item.completed}
                                onChange={() => {
                                    const updatedList = todoItems.map(todo => {
                                        if (todo.id === item.id) {
                                            todo.completed = !todo.completed;
                                        }
                                        return todo;
                                    });
                                    setTodoItems(updatedList);
                                }}
                            />
                            <dt style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>{item.text}</dt>
                            <button onClick={() => clearItem(item.id)}>Delete</button>
                        </div>
                    ))}
                </dl>
                {todoItems.length === 0 && <div className="no-items-message">Not found</div>}
            </section>
        </div>
    );
}

export default TodoList;
