const _apiUrl = "/api/userprofile";

export const getAllUserProfiles = () => {
    return fetch(_apiUrl).then((res) => res.json());
};
