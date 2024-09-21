// import { render, screen } from '@testing-library/react';
// import AdminHOC from './AdminHOC';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import rootReducer from '../../../redux/rootReducer.js';

// // Create a mock store
// const store = createStore(rootReducer, {
//   loading: false, // Default state
// });

// const DummyComponent = () => <div>Dummy Component</div>;

// describe('AdminHOC component', () => {
//   it('renders Loader when loading is true', () => {
//     // Set loading state to true before rendering
//     store.dispatch({ type: 'SET_LOADING', payload: true });

//     render(
//       <Provider store={store}>
//         <AdminHOC Component={DummyComponent} />
//       </Provider>
//     );

//     // Check if Loader is rendered
//     expect(screen.getByTestId('loader')).toBeInTheDocument();
//   });

//   it('renders Sidebar with correct items', () => {
//     render(
//       <Provider store={store}>
//         <AdminHOC Component={DummyComponent} />
//       </Provider>
//     );

//     // Check if the sidebar is rendered
//     expect(screen.getByTestId('adminhoc')).toBeInTheDocument();

//     // Check sidebar items
//     expect(screen.getByText('Dashboard')).toBeInTheDocument();
//     expect(screen.getByText('Categories')).toBeInTheDocument();
//     expect(screen.getByText('Books')).toBeInTheDocument();
//     expect(screen.getByText('Users')).toBeInTheDocument();
//     expect(screen.getByText('Issuances')).toBeInTheDocument();
//   });

//   it('renders the wrapped component', () => {
//     render(
//       <Provider store={store}>
//         <AdminHOC Component={DummyComponent} />
//       </Provider>
//     );

//     // Check if DummyComponent is rendered
//     expect(screen.getByText('Dummy Component')).toBeInTheDocument();
//   });
// });
