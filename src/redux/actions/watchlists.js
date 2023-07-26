import { SearchWatchLists, CreateWatchList, GetOneWatchList, DeleteWatchList } from '../../services/watchlists'

const searchWatchList = (userId, filters) => async (dispatch) => {
  try {
    const response = await SearchWatchLists(userId, filters)
    dispatch({type: 'SEARCH_WATCHLIST_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'SEARCH_WATCHLIST_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

const createWatchList = (data) => async (dispatch) => {
  try {
    const response = await CreateWatchList(data)
    dispatch({type: 'CREATE_WATCHLIST_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'CREATE_WATCHLIST_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

const getOneWatchList = (userId, tmdbId) => async (dispatch) => {
  try {
    const response = await GetOneWatchList(userId, tmdbId)
    dispatch({type: 'GET_ONE_WATCHLIST_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'GET_ONE_WATCHLIST_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

const deleteWatchList = (watchListId) => async (dispatch) => {
  try {
    const response = await DeleteWatchList(watchListId)
    dispatch({type: 'DELETE_WATCHLIST_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'DELETE_WATCHLIST_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

const resetWatchLists = () => ({
  type: 'RESET_WATCHLISTS',
})

export { searchWatchList, createWatchList, getOneWatchList, deleteWatchList, resetWatchLists }