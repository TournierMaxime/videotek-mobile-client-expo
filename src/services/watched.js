import { videotekApi as http } from './axios.js'

const UpdateWathed = (data, userId, watchListId) => {
  return http.put(`/watched/user/${userId}/watchlist/${watchListId}`, data, {
    withCredentials: true,
  })
}


export {
    UpdateWathed
}
