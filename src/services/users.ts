import { videotekApi as http } from "./axios.js"

const SearchUsers = (filters: any) => {
  return http.post(
    "/users/search",
    {},
    {
      params: filters,
    },
  )
}

const GetOneUser = (userId: string) => {
  return http.get(`/users/${userId}`, { withCredentials: true })
}

const UpdateUser = (data: any, userId: string) => {
  return http.put(`/users/${userId}`, data, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}

const DeleteUser = (userId: string) => {
  return http.delete(`/users/${userId}`, { withCredentials: true })
}

export { SearchUsers, GetOneUser, UpdateUser, DeleteUser }
