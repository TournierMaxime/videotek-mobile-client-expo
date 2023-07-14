import { videotekApi as http } from './axios.js'

const SearchFavorites = (userId, filters) => {
  return http.post(`/favorites/${userId}/search`, {}, { params: filters })
}

const CreateFavorite = (data) => {
  return http.post('/favorites/new', data, {
    withCredentials: true,
  })
}

const GetOneFavorite = (userId, tmdbId) => {
  return http.get(`/favorites/user/${userId}/tmdbId/${tmdbId}`, {
    withCredentials: true,
  })
}

const DeleteFavorite = (favoriteId) => {
  return http.delete(`/favorites/${favoriteId}`, {
    withCredentials: true,
  })
}

export {
  SearchFavorites,
  CreateFavorite,
  GetOneFavorite,
  DeleteFavorite
}
