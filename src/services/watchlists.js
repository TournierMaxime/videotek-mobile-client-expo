import { videotekApi as http } from './axios.js'

const SearchWatchLists = (userId, filters) => {
  return http.post(`/watchlists/${userId}/search`, {}, { params: filters })
}

const CreateWatchList = (data) => {
  return http.post('/watchlists/new', data, {
    withCredentials: true,
  })
}

const GetOneWatchList = (userId, tmdbId) => {
  return http.get(`/watchlists/user/${userId}/tmdbId/${tmdbId}`, {
    withCredentials: true,
  })
}

const DeleteWatchList = (watchListId) => {
  return http.delete(`/watchlists/${watchListId}`, {
    withCredentials: true,
  })
}

export {
  SearchWatchLists,
  CreateWatchList,
  GetOneWatchList,
  DeleteWatchList
}
