import { videotekApi as http } from "./axios.js";

const SearchUser = (filters) => {
  return http.post(
    "/users/search",
    {},
    {
      withCredentials: true,
      params: filters,
    }
  );
};

const GetUser = (userId) => {
  return http.get(`/users/${userId}`, { withCredentials: true });
};

const Update = (data, userId) => {
  return http.put(`/users/${userId}`, data, { withCredentials: true });
};

const Delete = (userId) => {
  return http.delete(`/users/${userId}`, { withCredentials: true });
};

export { GetUser, Update, SearchUser, Delete };
