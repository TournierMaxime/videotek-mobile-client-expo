import { MovieDetails, MovieCrew, ReleaseDates, MovieWatchProviders } from "../services/tmdb"

const movieDetails = async (id, language) => {
  try {
    const response = await MovieDetails(id, language)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const movieCrew = async (id, language) => {
  try {
    const response = await MovieCrew(id, language)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const releaseDates = async (id) => {
  try {
    const response = await ReleaseDates(id)
    return response.data.results
  } catch (error) {
    console.log(error)
    throw error
  }
}

const movieWatchProviders = async (id) => {
  try {
    const response = await MovieWatchProviders(id)
    return response.data.results
  } catch (error) {
    console.log(error)
    throw error
  }
}

export { movieDetails, movieCrew, releaseDates, movieWatchProviders }