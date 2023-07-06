import { MovieWatchProviders } from '../../../../services/tmdb'

export const movieWatchProviders =
  (id) => async (dispatch) => {
    try {
      const response = await MovieWatchProviders(id)
      dispatch({
        type: 'MOVIE_WATCH_PROVIDERS_SUCCESS',
        payload: response.data,
      })
      return response.data
    } catch (error) {
      dispatch({
        type: 'MOVIE_WATCH_PROVIDERS_FAILURE',
        payload: error.message,
      })
      console.log(error)
      throw error
    }
  }

export const resetMovieWatchProviders = () => ({
  type: 'RESET_MOVIE_WATCH_PROVIDERS',
})
