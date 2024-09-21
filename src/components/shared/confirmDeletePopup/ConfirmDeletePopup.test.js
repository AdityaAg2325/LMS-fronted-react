import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmDeletePopup from './ConfirmDeletePopup';

// Test case 1: Renders nothing when isOpen is false
test('does not render the popup when isOpen is false', () => {
  const { container } = render(
    <ConfirmDeletePopup isOpen={false} onClose={() => {}} onConfirm={() => {}} />
  );
  expect(container).toBeEmptyDOMElement(); // The popup should not render
});  

// Test case 3: Calls onClose when Cancel button is clicked
test('calls onClose when Cancel button is clicked', () => {
  const onCloseMock = jest.fn();
  
  render(
    <ConfirmDeletePopup isOpen={true} onClose={onCloseMock} onConfirm={() => {}} />
  );
  
  const cancelButton = screen.getByText(/Cancel/i);
  fireEvent.click(cancelButton);
  
  expect(onCloseMock).toHaveBeenCalled(); // Ensure onClose is called
});


// Test case 5: Snapshot testing
test('matches snapshot when isOpen is true', () => {
  const { asFragment } = render(
    <ConfirmDeletePopup isOpen={true} onClose={() => {}} onConfirm={() => {}} />
  );
  
  expect(asFragment()).toMatchSnapshot(); // Ensure UI matches the snapshot
});
