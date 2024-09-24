import {
    fetchCategories,
    deleteCategory,
    fetchAllCategories,
    createCategory,
    updateCategory,
    countAllCategories
  } from './CategoryService'; 
  import app from './serviceLMS';
  
  jest.mock('./serviceLMS');
  
  describe('Category API functions', () => {
  
    it('fetchCategories should return data on success', async () => {
      const mockData = [{ id: 1, name: 'Action' }, { id: 2, name: 'Adventure' }];
      app.get.mockResolvedValue({ data: mockData });
  
      const result = await fetchCategories();
      expect(result).toEqual(mockData);
      expect(app.get).toHaveBeenCalledWith('/api/categories');
    });

    it('deleteCategory should return data on successful deletion', async () => {
      const mockData = { message: 'Category deleted successfully' };
      app.delete.mockResolvedValue({ data: mockData });
  
      const result = await deleteCategory(1);
      expect(result).toEqual(mockData);
      expect(app.delete).toHaveBeenCalledWith('/api/categories/1');
    });
  
    it('deleteCategory should throw an error on failure', async () => {
      const mockError = { response: { data: { message: 'Category not found' } } };
      app.delete.mockRejectedValue(mockError);
  
      await expect(deleteCategory(999)).rejects.toThrow('Category not found');
    });

    it('fetchAllCategories should return paginated data', async () => {
      const mockData = { categories: [], totalPages: 5 };
      app.get.mockResolvedValue({ data: mockData });
  
      const result = await fetchAllCategories(0, 10, 'fiction');
      expect(result).toEqual(mockData);
      expect(app.get).toHaveBeenCalledWith('/api/categories/paginatedCategories', {
        params: {
          pageNumber: 0,
          pageSize: 10,
          search: 'fiction',
        },
      });
    });
  
    it('createCategory should return created data', async () => {
      const mockData = { id: 3, name: 'Science' };
      app.post.mockResolvedValue({ data: mockData });
  
      const result = await createCategory({ name: 'Science' });
      expect(result).toEqual(mockData);
      expect(app.post).toHaveBeenCalledWith('/api/categories/addCategory', { name: 'Science' });
    });
  
    it('createCategory should throw an error on failure', async () => {
      const mockError = { response: { data: { message: 'Category already exists' } } };
      app.post.mockRejectedValue(mockError);
  
      await expect(createCategory({ name: 'Fiction' })).rejects.toThrow('Category already exists');
    });
  
    it('updateCategory should return updated data', async () => {
      const mockData = { id: 1, name: 'Updated Category' };
      app.put.mockResolvedValue({ data: mockData });
  
      const result = await updateCategory({ name: 'Updated Category' }, 1);
      expect(result).toEqual(mockData);
      expect(app.put).toHaveBeenCalledWith('/api/categories/1', { name: 'Updated Category' });
    });
  
    it('updateCategory should throw an error on failure', async () => {
      const mockError = { response: { data: { message: 'Category not found' } } };
      app.put.mockRejectedValue(mockError);
  
      await expect(updateCategory({ name: 'New Name' }, 999)).rejects.toThrow('Category not found');
    });
  
    it('countAllCategories should return total count', async () => {
      const mockData = { count: 20 };
      app.get.mockResolvedValue({ data: mockData });
  
      const result = await countAllCategories();
      expect(result).toEqual(mockData);
      expect(app.get).toHaveBeenCalledWith('/api/categories/categoryCount');
    });
  });
  