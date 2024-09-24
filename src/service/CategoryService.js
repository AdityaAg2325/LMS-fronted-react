import app from "./serviceLMS"

export async function fetchCategories() {
    try {
        const response = await app.get('/api/categories')
        return response.data
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}

export async function deleteCategory(id) {
    try {
        const response = await app.delete(`/api/categories/${id}`)
        return response.data
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}
export async function fetchAllCategories(pageNumber, pageSize, search = '') {
    try {
        const response = await app.get('/api/categories/paginatedCategories', {
            params: {
                pageNumber: pageNumber,
                pageSize: pageSize,
                search: search
            }
        })
        return response.data
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}
export async function createCategory(categoryData) {
    try {
        const response = await app.post('/api/categories/addCategory', categoryData);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}
export async function updateCategory(categoryData, id) {
    try {
        const response = await app.put(`/api/categories/${id}`, categoryData);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}

export async function countAllCategories() {
    try {
        const response = await app.get('/api/categories/categoryCount')
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}