import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Tooltip from './Tooltip';

describe('Tooltip component', () => {
  test('does not display tooltip text initially', () => {
    render(
      <Tooltip tooltipText="Test Tooltip">
        <button>Hover me</button>
      </Tooltip>
    );

    const tooltipText = screen.queryByText('Test Tooltip');
    expect(tooltipText).not.toBeInTheDocument();
  });


  test('displays tooltip text on hover', () => {
    render(
      <Tooltip tooltipText="Test Tooltip">
        <button>Hover me</button>
      </Tooltip>
    );

    const button = screen.getByText('Hover me');
    fireEvent.mouseEnter(button);

    const tooltipText = screen.getByText('Test Tooltip');
    expect(tooltipText).toBeInTheDocument();
  });

  test('hides tooltip text on mouse leave', () => {
    render(
      <Tooltip tooltipText="Test Tooltip">
        <button>Hover me</button>
      </Tooltip>
    );

    const button = screen.getByText('Hover me');
    
    fireEvent.mouseEnter(button);
    expect(screen.getByText('Test Tooltip')).toBeInTheDocument();
    
    fireEvent.mouseLeave(button);
    expect(screen.queryByText('Test Tooltip')).not.toBeInTheDocument();
  });

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
