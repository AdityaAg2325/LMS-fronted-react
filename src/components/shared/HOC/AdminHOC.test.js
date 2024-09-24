
import React from 'react';
import { render, screen } from '../../../testUtils';
import AdminHOC from './AdminHOC';
import Loader from '../loader/Loader';

const MockComponent = () => <div data-testid="mock-component">Mock Component</div>;

describe('AdminHOC Component', () => {
  test('should render the wrapped component correctly', () => {
    const WrappedComponent = AdminHOC(MockComponent);
    render(<WrappedComponent />);

    expect(screen.getByTestId('adminhoc')).toBeInTheDocument();

    expect(screen.getByTestId('mock-component')).toBeInTheDocument();
  });

  test('should not display the loader when loading is false', () => {
    const WrappedComponent = AdminHOC(MockComponent);
    render(<WrappedComponent />);

    expect(screen.queryByTestId('loader')).toBeNull();
  });

});
