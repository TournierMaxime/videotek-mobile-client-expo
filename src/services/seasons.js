import { videotekApi as http } from './axios.js'

const CreateSeason = (data) => {
  return http.post('/seasons/new', data, {
    withCredentials: true,
  })
}

const GetOneSeason = (userId, seasonId) => {
  return http.get(`/seasons/user/${userId}/season/${seasonId}`, {
    withCredentials: true,
  })
}

const DeleteSeason = (seasonId) => {
  return http.delete(`/seasons/${seasonId}`, {
    withCredentials: true,
  })
}

export {
  CreateSeason,
  GetOneSeason,
  DeleteSeason
}
