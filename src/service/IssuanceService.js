import app from "./serviceLMS";

export async function fetchAllIssuances(pageNumber, pageSize, search) {
    try {
        const response = await app.get('/api/issuances', {
            params: {
                pageNumber: Number(pageNumber),
                pageSize: Number(pageSize),
                search: search
            }
        })
        return response.data
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}

export async function createIssuance(issuanceData) {
    try {
        const response = await app.post('/api/issuances/create', issuanceData);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}

export async function deleteIssuance(id) {
    try {
        const response = await app.delete(`/api/issuances/${id}`)
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}

export async function updateIssuance(issuanceData, id) {
    try {
        const response = await app.put(`/api/issuances/${id}`, issuanceData)
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}

export async function userHistory(mobileNumber, pageNumber, pageSize) {
    try {
        const response = await app.get(`/api/issuances/user/history/${mobileNumber}`, {
            params: {
                pageNumber: Number(pageNumber),
                pageSize: Number(pageSize)
            }
        })
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}

export async function bookHistory(id, pageNumber, pageSize) {
    try {
        const response = await app.get(`/api/issuances/book/history/${id}`, {
            params: {
                pageNumber: Number(pageNumber),
                pageSize: Number(pageSize)
            }
        })
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}