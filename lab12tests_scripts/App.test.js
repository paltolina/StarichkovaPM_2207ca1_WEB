import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('renders the App component', () => {
	render(<App />);

	const headerElement = screen.getByText(/TO-DO LIST/i);
	expect(headerElement).toBeInTheDocument();
});

test('adds a new todo item through App component', () => {
	render(<App />);

	const input = screen.getByPlaceholderText('����� ������� ������');
	const addButton = screen.getByText('��������');

	fireEvent.change(input, { target: { value: 'New Todo' } });
	fireEvent.click(addButton);

	const newItem = screen.getByText('New Todo');
	expect(newItem).toBeInTheDocument();
});
test('renders the header', () => {
	render(<App />);
	const headerElement = screen.getByText(/TO-DO LIST/i);
	expect(headerElement).toBeInTheDocument();
});

test('renders input field and buttons', () => {
	render(<App />);
	const inputElement = screen.getByPlaceholderText('����� ������� ������');
	const addButton = screen.getByText('��������');
	const clearAllButton = screen.getByText('�������� ��');

	expect(inputElement).toBeInTheDocument();
	expect(addButton).toBeInTheDocument();
	expect(clearAllButton).toBeInTheDocument();
});