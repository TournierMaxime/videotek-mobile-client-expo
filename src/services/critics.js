import { videotekApi as http } from './axios.js'

const SearchCritic = (id, filters) => {
  return http.post(`/critics/search/${id}`, {
    params: {
      filters
    }
  })
}

const SearchCriticByUser = (userId, filters) => {
  return http.post(`/critics/search/user/${userId}`, {
    params: {
      filters
    },
    withCredentials: true
  },
  )
}

const GetOneCritic = (id) => {
  return http.get(`/critics/${id}`)
}

const CreateCritic = (data) => {
  return http.post('/critics/new', data, {
    withCredentials: true,
  })
}

const UpdateCritic = (id, data) => {
  return http.put(`/critics/${id}`, data, {
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
  DeleteCritic,
  UpdateCritic,
  SearchCriticByUser,
  GetOneCritic
}
