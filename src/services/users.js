import { videotekApi as http } from './axios.js'

const SearchUsers = (filters) => {
  return http.post(
    '/users/search',
    {},
    {
      withCredentials: true,
      params: filters,
    }
  )
}

const GetOneUser = (userId) => {
  return http.get(`/users/${userId}`, { withCredentials: true })
}

const UpdateUser = (data, userId) => {
  return http.put(`/users/${userId}`, data, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

const DeleteUser = (userId) => {
  return http.delete(`/users/${userId}`, { withCredentials: true })
}

export { SearchUsers, GetOneUser, UpdateUser, DeleteUser }
