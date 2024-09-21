import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Tooltip from './Tooltip';

describe('Tooltip component', () => {
  // Test to check if tooltip text is not shown initially
  test('does not display tooltip text initially', () => {
    render(
      <Tooltip tooltipText="Test Tooltip">
        <button>Hover me</button>
      </Tooltip>
    );
    
    // Tooltip should not be visible initially
    const tooltipText = screen.queryByText('Test Tooltip');
    expect(tooltipText).not.toBeInTheDocument();
  });

  // Test to check if tooltip text appears on hover
  test('displays tooltip text on hover', () => {
    render(
      <Tooltip tooltipText="Test Tooltip">
        <button>Hover me</button>
      </Tooltip>
    );

    // Hover over the button
    const button = screen.getByText('Hover me');
    fireEvent.mouseEnter(button);

    // Tooltip should be visible on hover
    const tooltipText = screen.getByText('Test Tooltip');
    expect(tooltipText).toBeInTheDocument();
  });

  // Test to check if tooltip text disappears on mouse leave
  test('hides tooltip text on mouse leave', () => {
    render(
      <Tooltip tooltipText="Test Tooltip">
        <button>Hover me</button>
      </Tooltip>
    );

    const button = screen.getByText('Hover me');
    
    // Hover over the button to display tooltip
    fireEvent.mouseEnter(button);
    expect(screen.getByText('Test Tooltip')).toBeInTheDocument();
    
    // Mouse leave should hide the tooltip
    fireEvent.mouseLeave(button);
    expect(screen.queryByText('Test Tooltip')).not.toBeInTheDocument();
  });

  // Test to check if the children are rendered correctly
  test('renders the child element correctly', () => {
    render(
      <Tooltip tooltipText="Test Tooltip">
        <button>Hover me</button>
      </Tooltip>
    );

    const button = screen.getByText('Hover me');
    expect(button).toBeInTheDocument();
  });
});
