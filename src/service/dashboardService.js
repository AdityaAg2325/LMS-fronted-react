import app from "./serviceLMS";

export async function dashStats(){
    const response = await app.get('/api/stats/statistics')
    return response.data;
}