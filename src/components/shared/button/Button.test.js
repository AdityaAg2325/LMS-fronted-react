import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('renders button with default props', () => {
  render(<Button text="Click me" />);
  const buttonElement = screen.getByRole('button', { name: /click me/i });
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveClass('btn');
  expect(buttonElement).toHaveAttribute('type', 'button'); 
});

test('triggers onClick event when button is clicked', () => {
  const handleClick = jest.fn(); 
  render(<Button text="Click me" onClick={handleClick} />);
  const buttonElement = screen.getByRole('button', { name: /click me/i });
  
  fireEvent.click(buttonElement);
  expect(handleClick).toHaveBeenCalledTimes(1); 
});

test('renders button with custom text', () => {
  render(<Button text="Submit" />);
  const buttonElement = screen.getByRole('button', { name: /submit/i });
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveTextContent('Submit');
});

test('applies custom className to button', () => {
  render(<Button text="Click me" className="custom-btn" />);
  const buttonElement = screen.getByRole('button', { name: /click me/i });
  expect(buttonElement).toHaveClass('btn custom-btn'); 
});

test('renders with a submit type', () => {
  render(<Button text="Submit" type="submit" />);
  const buttonElement = screen.getByRole('button', { name: /submit/i });
  expect(buttonElement).toHaveAttribute('type', 'submit');
});

test('matches snapshot', () => {
  const { asFragment } = render(<Button text="Click me" />);
  expect(asFragment()).toMatchSnapshot(); 
});
