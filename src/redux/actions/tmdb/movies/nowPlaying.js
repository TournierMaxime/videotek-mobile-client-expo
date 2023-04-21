import { NowPlaying } from '../../../../services/tmdb'

export const nowPlaying = (page, target = 'nowPlaying') => async (dispatch) => {
    try {
        dispatch({ type: 'NOW_PLAYING_REQUEST', target });
        const response = await NowPlaying(page)
        dispatch({type: 'NOW_PLAYING_SUCCESS', payload: response.data, target});
        return response.data
    } catch (error) {
        dispatch({type: 'NOW_PLAYING_FAILURE', payload: error.message, target});
        console.log(error)
        throw error
    }
};
