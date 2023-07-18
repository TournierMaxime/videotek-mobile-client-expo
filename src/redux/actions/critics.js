import {
  SearchCritic,
  SearchCriticByUser,
  CreateCritic,
  GetOneCritic,
  UpdateCritic,
  DeleteCritic,
} from '../../services/critics'

const searchCritic = (id, filters) => async (dispatch) => {
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

const searchCriticByUser = (userId, filters) => async (dispatch) => {
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

const createCritic = (data) => async (dispatch) => {
  try {
    const response = await CreateCritic(data)
    dispatch({ type: 'CREATE_CRITIC_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'CREATE_CRITIC_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

const getOneCritic = (id) => async (dispatch) => {
  try {
    const response = await GetOneCritic(id)
    dispatch({ type: 'GET_ONE_CRITIC_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'GET_ONE_CRITIC_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

const updateCritic = (id, data) => async (dispatch) => {
  try {
    const response = await UpdateCritic(id, data)
    dispatch({ type: 'UPDATE_CRITIC_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'UPDATE_CRITIC_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

const deleteCritic = (id) => async (dispatch) => {
  try {
    const response = await DeleteCritic(id)
    dispatch({ type: 'DELETE_CRITIC_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'DELETE_CRITIC_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

const resetSearchCritic = () => ({
  type: 'SEARCH_CRITIC_RESET',
})

export {
  searchCritic,
  searchCriticByUser,
  createCritic,
  getOneCritic,
  updateCritic,
  deleteCritic,
  resetSearchCritic,
}
