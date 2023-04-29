import { videotekApi as http } from "./axios.js";

const SearchCritic = (filters) => {
  return http.post(
    "/critics/search",
    {
      params: filters,
    }
  );
};

const CreateCritic = (data) => {
  return http.post(
    "/critics/new",
    data,
    {
      withCredentials: true
    }
  );
};


export { SearchCritic, CreateCritic };
