import axios from "axios"
import {
  EXPO_VIDEOTEK_API,
  EXPO_TMDB_API,
  EXPO_VIDEOTEK_IMPORT_API,
} from "@env"

const videotekApi = axios.create({
  baseURL: EXPO_VIDEOTEK_API,
  withCredentials: true,
})

const tmdbApi = axios.create({
  baseURL: EXPO_TMDB_API,
})

const videotekImportApi = axios.create({
  baseURL: EXPO_VIDEOTEK_IMPORT_API,
})

export { videotekApi, tmdbApi, videotekImportApi }
