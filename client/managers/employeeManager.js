const _apiUrl = "/api/employees";

export const getAllEmployees = () => {
    return fetch(_apiUrl).then((res)=>res.json());
};