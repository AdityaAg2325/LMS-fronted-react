import app from "./serviceLMS";

export async function dashStats() {
    try {
        const response = await app.get('/api/stats/statistics')
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}