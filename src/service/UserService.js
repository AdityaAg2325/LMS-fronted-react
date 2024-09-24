import app from "./serviceLMS"

export async function fetchUsers() {
    try {
        const response = await app.get('/api/user')
        return response.data
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}

export async function deleteUsers(mobileNumber) {
    try {
        const response = await app.delete(`/api/user/${mobileNumber}`)
        return response.data
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}

export async function fetchAllUsers(pageNumber, pageSize, search = '') {
    try {
        const response = await app.get('/api/user/paginatedUsers', {
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

export async function createUser(userData) {
    try {
        const response = await app.post('/api/user/register', userData);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}

export async function updateUser(userData, mobileNumber) {
    try {
        const response = await app.put(`/api/user/${mobileNumber}`, userData);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}

export async function countAllUsers() {
    try {
        const response = await app.get('/api/user/userCount')
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}

export async function userLogin(data) {
    try {
        const response = await app.post('/api/login', data);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}

export async function getUserByToken(token) {
    try {
        const response = await app.get('/api/current-user', {
            headers: {
                Authorization: token
            }
        })
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}

export const logoutUser = () => {
    window.localStorage.removeItem('authtoken')
}