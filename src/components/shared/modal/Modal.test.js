import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal.jsx';

describe('Modal component', () => {
  test('renders correctly when open', () => {
    render(<Modal isOpen={true} onClose={() => {}} title="Test Modal">This is a modal content</Modal>);

    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('This is a modal content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /×/i })).toBeInTheDocument(); 
  });

  test('does not render when closed', () => {
    const { container } = render(<Modal isOpen={false} onClose={() => {}} title="Test Modal">This is a modal content</Modal>);

    expect(container).toBeEmptyDOMElement();
  });

  test('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<Modal isOpen={true} onClose={onClose} title="Test Modal">This is a modal content</Modal>);

    fireEvent.click(screen.getByRole('button', { name: /×/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('displays the correct title', () => {
    render(<Modal isOpen={true} onClose={() => {}} title="Unique Title">This is a modal content</Modal>);

    expect(screen.getByText('Unique Title')).toBeInTheDocument();
  });
});
