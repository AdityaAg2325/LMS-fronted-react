import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '../../../testUtils';
import '@testing-library/jest-dom/extend-expect';
import CategoriesAdmin from './CategoriesAdmin';
import { createCategory, deleteCategory, fetchAllCategories } from '../../../service/CategoryService';
import AdminHOC from '../../shared/HOC/AdminHOC';
import ConfirmDeletePopup from '../../shared/confirmDeletePopup/ConfirmDeletePopup';


// Mock the service functions
jest.mock('../../../service/CategoryService', () => ({
    fetchAllCategories: jest.fn(),
    createCategory: jest.fn(),
    deleteCategory: jest.fn(),
}));

describe('CategoriesAdmin Component', () => {
    const setLoading = jest.fn();
    const WrappedComponent = AdminHOC(CategoriesAdmin);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders CategoriesAdmin component successfully', async () => {
        render(<WrappedComponent setLoading={setLoading} />);

        await waitFor(() => expect(screen.getByText('Available Categories')).toBeInTheDocument());
        expect(screen.getByPlaceholderText('Search by Name')).toBeInTheDocument();
        expect(screen.getByText('Add Category')).toBeInTheDocument();
    });

    test('loads categories on component mount', async () => {

        jest.useFakeTimers();

        fetchAllCategories.mockResolvedValue({
            content: [
                { id: 1, name: 'Fiction' },
                { id: 2, name: 'Non-Fiction' },
            ],
            totalPages: 1,
        });

        await act(async () => {
            render(<WrappedComponent setLoading={jest.fn()} />);
        })

        jest.advanceTimersByTime(1000);

        await waitFor(() => expect(fetchAllCategories).toHaveBeenCalledTimes(1));

        const fictionCategory = await screen.findByText('Fiction');
        const nonFictionCategory = await screen.findByText('Non-Fiction');

        expect(fictionCategory).toBeInTheDocument();
        expect(nonFictionCategory).toBeInTheDocument();
    });
    

    test('opens the add category modal when Add Category button is clicked', async () => {
        render(<WrappedComponent setLoading={setLoading} />);

        const addButton = screen.getByText('Add Category');
        fireEvent.click(addButton);

        await waitFor(() => expect(screen.getByText('Add New Category')).toBeInTheDocument());
        expect(screen.getByText('Category Name:')).toBeInTheDocument();
    });

    test('deletes a category when confirmed', async () => {

        jest.useFakeTimers();

        deleteCategory.mockResolvedValue({ message: 'Successfully deleted' });
        fetchAllCategories.mockResolvedValue({
            content: [
                { id: 1, name: 'Fiction' },
                { id: 2, name: 'Non-Fiction' },
                { id: 3, name: 'History' },
                { id: 4, name: 'Politics' },
            ],
            totalPages: 1,
        });

        await act(async () => {
            render(<WrappedComponent setLoading={jest.fn()} />);
        })

        jest.advanceTimersByTime(1000);

        await waitFor(() => fireEvent.click(screen.getByTestId(`delete-icon-1`)));
        await waitFor(() => fireEvent.click(screen.getByRole('button', { name: 'Delete' })));

        await waitFor(() => expect(deleteCategory).toHaveBeenCalledWith(1));
    });

    test('error: deletes a category when confirmed', async () => {

        jest.useFakeTimers();

        deleteCategory.mockResolvedValue(new Error('Cannot delete this category.'));
        fetchAllCategories.mockResolvedValue({
            content: [
                { id: 1, name: 'Fiction' },
                { id: 2, name: 'Non-Fiction' },
                { id: 3, name: 'History' },
                { id: 4, name: 'Politics' },
            ],
            totalPages: 1,
        });

        await act(async () => {
            render(<WrappedComponent setLoading={jest.fn()} />);
        })

        jest.advanceTimersByTime(1000);

        await waitFor(() => fireEvent.click(screen.getByTestId(`delete-icon-1`)));
        await waitFor(() => fireEvent.click(screen.getByRole('button', { name: 'Delete' })));

        await waitFor(() => expect(deleteCategory).toHaveBeenCalledWith(1));

        jest.advanceTimersByTime(1000);

        await waitFor(() => expect(screen.queryByText('Fiction')).toBeInTheDocument());

        await waitFor(() => expect(screen.getByText('Cannot delete this category.')).toBeInTheDocument());

    });

    it('should update search term on input change', async () => {

        await act(async () => {
            render(<WrappedComponent setLoading={jest.fn()} />);
        })

        const input = screen.getByPlaceholderText('Search by Name');

        fireEvent.change(input, { target: { value: 'Category' } });

        const event = { target: { value: "Category" } };

        expect(input.value).toBe('Category');
    });

    it('should load categories after adding category', async () => {

        jest.useFakeTimers();

        const setLoading = jest.fn(); // mock the setLoading prop
        
        // Mock the fetchAllCategories response
        fetchAllCategories.mockResolvedValue({
          content: [],
          totalPages: 1,
        });
      
        await act(async () => {
            render(<WrappedComponent setLoading={jest.fn()} />);
        })

        jest.advanceTimersByTime(1000);
      
        // Simulate clicking the "Add Category" button
        const addButton = screen.getByText('Add Category');
        fireEvent.click(addButton);
      
        // Wait for the categories to be loaded
        await waitFor(() => {
          expect(fetchAllCategories).toHaveBeenCalled();
        });
    });  
      

    it('should open confirmation popup and delete category on confirm', () => {
        // const deleteCategories = jest.fn(); // Mock the delete function
        const setIsConfirmPopupOpen = jest.fn(); // Mock the close popup function
      
        // Render the component with the necessary props
        const { getByText } = render(
          <ConfirmDeletePopup 
            isOpen={true} 
            onConfirm={deleteCategory} 
            onClose={() => setIsConfirmPopupOpen(false)} 
          />
        );
      
        // Simulate the confirm button click (assuming the button text is 'Confirm')
        fireEvent.click(getByText('Delete'));
      
        // Expect deleteCategories to have been called
        expect(deleteCategory).toHaveBeenCalled();
      });
      
    it('should close modal and reset selected category', async () => {
        await act(async () => {
            render(<WrappedComponent setLoading={jest.fn()} />);
        })
      
        // Simulate opening the modal (assuming there's a button to open it)
        fireEvent.click(screen.getByText('Add Category'));
      
        // Simulate closing the modal (assuming there's a "Cancel" button in the modal)
        fireEvent.click(screen.getByTestId('modal-cross'));
      
        // Assert that the modal is closed by checking if it's no longer in the DOM
        expect(screen.queryByText('Add New Category')).toBeNull(); // Assuming 'Add New Category' text is in the modal
      
      });
      

});
