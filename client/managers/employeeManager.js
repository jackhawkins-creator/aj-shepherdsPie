const _apiUrl = "http://localhost:5001/api/employees";

export const getAllEmployees = () => {
    return fetch(_apiUrl, {
  credentials: "include"
}).then((res) => res.json());

};