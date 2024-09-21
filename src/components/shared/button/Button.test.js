import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

// Test case 1: Renders button with default props
test('renders button with default props', () => {
  render(<Button text="Click me" />);
  const buttonElement = screen.getByRole('button', { name: /click me/i });
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveClass('btn');
  expect(buttonElement).toHaveAttribute('type', 'button'); // default type
});

// Test case 2: Triggers onClick event when clicked
test('triggers onClick event when button is clicked', () => {
  const handleClick = jest.fn(); // mock function
  render(<Button text="Click me" onClick={handleClick} />);
  const buttonElement = screen.getByRole('button', { name: /click me/i });
  
  fireEvent.click(buttonElement); // simulate click event
  expect(handleClick).toHaveBeenCalledTimes(1); // ensure it was called
});

// Test case 3: Renders button with custom text
test('renders button with custom text', () => {
  render(<Button text="Submit" />);
  const buttonElement = screen.getByRole('button', { name: /submit/i });
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveTextContent('Submit'); // ensures the correct text
});

// Test case 4: Applies custom className to button
test('applies custom className to button', () => {
  render(<Button text="Click me" className="custom-btn" />);
  const buttonElement = screen.getByRole('button', { name: /click me/i });
  expect(buttonElement).toHaveClass('btn custom-btn'); // checks custom class
});

// Test case 5: Renders with different type prop
test('renders with a submit type', () => {
  render(<Button text="Submit" type="submit" />);
  const buttonElement = screen.getByRole('button', { name: /submit/i });
  expect(buttonElement).toHaveAttribute('type', 'submit');
});

// Test case 6: Snapshot Testing
test('matches snapshot', () => {
  const { asFragment } = render(<Button text="Click me" />);
  expect(asFragment()).toMatchSnapshot(); // snapshot to check UI structure
});
