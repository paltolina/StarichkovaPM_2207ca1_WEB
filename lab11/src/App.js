import React from 'react';
import TodoList from './components/TodoList';
import './style.css';

function App() {
    return (
        <div className="App">
            <header>
                <h1>TO-DO LIST</h1>
            </header>
            <TodoList />
            <footer>
                <p>&copy; 2024</p>
            </footer>
        </div>
    );
}

export default App;
