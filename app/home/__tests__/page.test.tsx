import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../HomePage';

test('renders home page', () => {
    render(<HomePage />);
    const linkElement = screen.getByText(/welcome to the home page/i);
    expect(linkElement).toBeInTheDocument();
});