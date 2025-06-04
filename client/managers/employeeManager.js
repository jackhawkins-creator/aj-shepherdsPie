const _apiUrl = "/api/employee";

export const getAllEmployees = () => {
    return fetch(_apiUrl).then((res)=>res.json());
};