// AdminHOC.test.js
import React from 'react';
import { render, screen } from '../../../testUtils';
// import '@testing-library/jest-dom/extend-expect';
import AdminHOC from './AdminHOC';
import Loader from '../loader/Loader';


// Mock Component to be wrapped by AdminHOC
const MockComponent = () => <div data-testid="mock-component">Mock Component</div>;

describe('AdminHOC Component', () => {
  test('should render the wrapped component correctly', () => {
    const WrappedComponent = AdminHOC(MockComponent);
    render(<WrappedComponent />);

    // Check if Sidebar is rendered
    expect(screen.getByTestId('adminhoc')).toBeInTheDocument();

    // Check if MockComponent (the child component) is rendered
    expect(screen.getByTestId('mock-component')).toBeInTheDocument();
  });

  test('should not display the loader when loading is false', () => {
    const WrappedComponent = AdminHOC(MockComponent);
    render(<WrappedComponent />);

    // Ensure loader is not displayed initially (default state)
    expect(screen.queryByTestId('loader')).toBeNull();
  });

});
