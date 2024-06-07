import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TodoList from './TodoList';

beforeEach(() => {
    global.localStorage.setItem('todoList', JSON.stringify([{ id: 1, text: 'Mocked Todo', completed: false }]));
});

afterEach(() => {
    global.localStorage.clear();
});

test('renders the TodoList component with a mocked todo', () => {
    render(<TodoList />);

    const todoItem = screen.getByText('Mocked Todo');
    expect(todoItem).toBeInTheDocument();
});

test('displays a message when the list is empty', () => {
    global.localStorage.clear();
    render(<TodoList />);

    const emptyMessage = screen.getByText('Не найдено ни одного дела');
    expect(emptyMessage).toBeInTheDocument();
});

test('adds a new todo item', () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText('Новый элемент списка');
    const addButton = screen.getByText('Добавить');

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    const newItem = screen.getByText('New Todo');
    expect(newItem).toBeInTheDocument();
});
