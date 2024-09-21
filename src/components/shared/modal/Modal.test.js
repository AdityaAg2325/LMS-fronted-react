import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal.jsx';

describe('Modal component', () => {
  test('renders correctly when open', () => {
    render(<Modal isOpen={true} onClose={() => {}} title="Test Modal">This is a modal content</Modal>);

    // Check if the modal title and content are in the document
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('This is a modal content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /×/i })).toBeInTheDocument(); // Close button
  });

  test('does not render when closed', () => {
    const { container } = render(<Modal isOpen={false} onClose={() => {}} title="Test Modal">This is a modal content</Modal>);

    // Check that the modal container is not in the document
    expect(container).toBeEmptyDOMElement();
  });

  test('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<Modal isOpen={true} onClose={onClose} title="Test Modal">This is a modal content</Modal>);

    // Click the close button
    fireEvent.click(screen.getByRole('button', { name: /×/i }));

    // Check if onClose was called
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('displays the correct title', () => {
    render(<Modal isOpen={true} onClose={() => {}} title="Unique Title">This is a modal content</Modal>);

    // Check if the title is rendered correctly
    expect(screen.getByText('Unique Title')).toBeInTheDocument();
  });
});
