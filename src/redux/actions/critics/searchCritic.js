import { SearchCritic, SearchCriticByUser } from '../../../services/critic'

export const searchCritic = (id, filters) => async (dispatch) => {
  try {
    dispatch({ type: 'SEARCH_CRITIC_REQUEST' })
    const response = await SearchCritic(id, filters)
    dispatch({ type: 'SEARCH_CRITIC_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'SEARCH_CRITIC_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

export const searchCriticByUser = (userId, filters) => async (dispatch) => {
  try {
    dispatch({ type: 'SEARCH_CRITIC_BY_USER_REQUEST' })
    const response = await SearchCriticByUser(userId, filters)
    dispatch({ type: 'SEARCH_CRITIC_BY_USER_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'SEARCH_CRITIC_BY_USER_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

export const resetSearchCritic = () => ({
  type: 'SEARCH_CRITIC_RESET',
})
