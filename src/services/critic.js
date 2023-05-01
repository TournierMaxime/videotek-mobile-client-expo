import { videotekApi as http } from './axios.js'

const SearchCritic = (id, page) => {
  return http.get(`/critics/search/${id}`, {
    params: {
      page
    }
  })
}

const SearchCriticByUser = (userId, page) => {
  return http.get(`/critics/search/user/${userId}`, {
    params: {
      page
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
