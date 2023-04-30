import { videotekApi as http } from './axios.js'

const SearchCritic = (id, page) => {
  return http.get(`/critics/search/${id}`, {
    params: {
      page
    }
  })
}

const CreateCritic = (data) => {
  return http.post('/critics/new', data, {
    withCredentials: true,
  })
}

const DeleteCritic = (id) => {
  return http.delete(`/critics/${id}`, {
    withCredentials: true,
  })
}

export {
  SearchCritic,
  CreateCritic,
  DeleteCritic
}
