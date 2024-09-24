import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmDeletePopup from './ConfirmDeletePopup';

test('does not render the popup when isOpen is false', () => {
  const { container } = render(
    <ConfirmDeletePopup isOpen={false} onClose={() => {}} onConfirm={() => {}} />
  );
  expect(container).toBeEmptyDOMElement(); 
});  

test('calls onClose when Cancel button is clicked', () => {
  const onCloseMock = jest.fn();
  
  render(
    <ConfirmDeletePopup isOpen={true} onClose={onCloseMock} onConfirm={() => {}} />
  );
  
  const cancelButton = screen.getByText(/Cancel/i);
  fireEvent.click(cancelButton);
  
  expect(onCloseMock).toHaveBeenCalled(); 
});


test('matches snapshot when isOpen is true', () => {
  const { asFragment } = render(
    <ConfirmDeletePopup isOpen={true} onClose={() => {}} onConfirm={() => {}} />
  );
  
  expect(asFragment()).toMatchSnapshot(); 
});
