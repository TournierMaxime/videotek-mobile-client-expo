import { videotekApi as http } from './axios.js'

const CreateEpisode = (data) => {
  return http.post('/episodes/new', data, {
    withCredentials: true,
  })
}

const DeleteEpisode = (episodeId) => {
  return http.delete(`/episodes/${episodeId}`, {
    withCredentials: true,
  })
}

export {
  CreateEpisode,
  DeleteEpisode
}
