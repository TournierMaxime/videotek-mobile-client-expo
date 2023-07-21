import axios from 'axios'
import { EXPO_VIDEOTEK_API, EXPO_TMDB_API, EXPO_GIPHY_API } from '@env'

const videotekApi = axios.create({
  baseURL: EXPO_VIDEOTEK_API,
  withCredentials: true,
})

const giphyApi = axios.create({
  baseURL: EXPO_GIPHY_API,
})

const tmdbApi = axios.create({
  baseURL: EXPO_TMDB_API,
})

export { videotekApi, giphyApi, tmdbApi }
