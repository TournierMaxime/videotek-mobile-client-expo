import {
  SearchLikes,
  CreateLike,
  GetOneLikePost,
  GetOneLikeComment,
  GetOneLikeCritic,
  DeleteLike,
} from '../../services/likes'

const searchLike = (userId, filters) => async (dispatch) => {
  try {
    const response = await SearchLikes(userId, filters)
    dispatch({ type: 'SEARCH_LIKE_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'SEARCH_LIKE_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

const createLike = (data) => async (dispatch) => {
  try {
    const response = await CreateLike(data)
    dispatch({ type: 'CREATE_LIKE_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'CREATE_LIKE_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

const getOneLikePost = (userId, postId) => async (dispatch) => {
  try {
    const response = await GetOneLikePost(userId, postId)
    dispatch({ type: 'GET_ONE_LIKE_POST_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'GET_ONE_LIKE_POST_FAILURE', payload: error.message })
    //console.log(error)
    throw error
  }
}

const getOneLikeComment = (userId, commentId) => async (dispatch) => {
  try {
    const response = await GetOneLikeComment(userId, commentId)
    dispatch({ type: 'GET_ONE_LIKE_COMMENT_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'GET_ONE_LIKE_COMMENT_FAILURE', payload: error.message })
    //console.log(error)
    throw error
  }
}

const getOneLikeCritic = (userId, criticId) => async (dispatch) => {
  try {
    const response = await GetOneLikeCritic(userId, criticId)
    dispatch({ type: 'GET_ONE_LIKE_CRITIC_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'GET_ONE_LIKE_CRITIC_FAILURE', payload: error.message })
    //console.log(error)
    throw error
  }
}

const deleteLike = (favoriteId) => async (dispatch) => {
  try {
    const response = await DeleteLike(favoriteId)
    dispatch({ type: 'DELETE_LIKE_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'DELETE_LIKE_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

const resetLike = () => ({
  type: 'RESET_LIKE',
})

export {
  searchLike,
  createLike,
  getOneLikePost,
  getOneLikeComment,
  getOneLikeCritic,
  deleteLike,
  resetLike
}
