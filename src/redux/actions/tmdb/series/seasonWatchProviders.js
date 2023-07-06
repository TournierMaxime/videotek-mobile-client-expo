import { SeasonWatchProviders } from '../../../../services/tmdb'

export const seasonWatchProviders =
  (id, seasonNumber, language) => async (dispatch) => {
    try {
      const response = await SeasonWatchProviders(id, seasonNumber, language)
      dispatch({
        type: 'SEASON_WATCH_PROVIDERS_SUCCESS',
        payload: response.data,
      })
      return response.data
    } catch (error) {
      dispatch({
        type: 'SEASON_WATCH_PROVIDERS_FAILURE',
        payload: error.message,
      })
      console.log(error)
      throw error
    }
  }

export const updateSeasonWatchProviders =
  (id, seasonNumber, language) => async (dispatch) => {
    try {
      const response = await SeasonWatchProviders(id, seasonNumber, language)
      dispatch({
        type: 'UPDATE_SEASON_WATCH_PROVIDERS',
        payload: {
          seasonNumber,
          watchProviders: response.data,
        },
      })
    } catch (error) {
      dispatch({
        type: 'SEASON_WATCH_PROVIDERS_FAILURE',
        payload: error.message,
      })
      console.log(error)
      throw error
    }
  }

export const resetSeasonWatchProviders = () => ({
  type: 'RESET_SEASON_WATCH_PROVIDERS',
})
