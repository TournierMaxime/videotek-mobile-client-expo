import { NowPlaying } from '../../../../services/tmdb'

export const nowPlaying = (page, target = 'nowPlaying', language) => async (dispatch) => {
    try {
        dispatch({ type: 'NOW_PLAYING_REQUEST', target });
        const response = await NowPlaying(page, language)
        dispatch({type: 'NOW_PLAYING_SUCCESS', payload: response.data, target});
        return response.data
    } catch (error) {
        dispatch({type: 'NOW_PLAYING_FAILURE', payload: error.message, target});
        console.log(error)
        throw error
    }
};

export const resetNowPlaying = () => ({
  type: 'RESET_NOW_PLAYING',
})
