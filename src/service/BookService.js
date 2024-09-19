import app from "./serviceLMS"

export async function fetchBooks (){
    const response = await app.get('/api/books')
    return response.data
}

export async function deleteBooks (id){
    try{
    const response = await app.delete(`/api/books/${id}`)
    return response.data
}catch(error){
    throw new Error(error?.response?.data?.message);
}}

export async function fetchAllBooks (pageNumber, pageSize, search){
    const response = await app.get('/api/books/paginatedBooks', {
        params : {
            pageNumber: Number(pageNumber),
            pageSize: Number(pageSize),
            search: search
        }
    })
    return response.data
}

export async function createBook(bookData) {
    try{
    const response = await app.post('/api/books/addBook', bookData);
    return response.data;
}catch(error){
    throw new Error(error?.response?.data?.message);
}}

export async function countAllBooks(){
    const response = await app.get('/api/books/bookCount')
    return response.data;
}

export async function updateBook(bookData, id) {
    try{
    const response = await app.put(`/api/books/${id}`, bookData);
    return response.data;
}catch(error){
    throw new Error(error?.response?.data?.message);
}}
