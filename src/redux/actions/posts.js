import {
  SearchPosts,
  SearchPostsByUser,
  CreatePost,
  GetOnePost,
  UpdatePost,
  DeletePost,
} from '../../services/posts'

const searchPost = (id, filters) => async (dispatch) => {
  try {
    dispatch({ type: 'SEARCH_POST_REQUEST' })
    const response = await SearchPosts(id, filters)
    dispatch({ type: 'SEARCH_POST_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'SEARCH_POST_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

const searchPostByUser = (userId, filters) => async (dispatch) => {
  try {
    dispatch({ type: 'SEARCH_POST_BY_USER_REQUEST' })
    const response = await SearchPostsByUser(userId, filters)
    dispatch({ type: 'SEARCH_POST_BY_USER_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'SEARCH_POST_BY_USER_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

const createPost = (data) => async (dispatch) => {
  try {
    const response = await CreatePost(data)
    dispatch({ type: 'CREATE_POST_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'CREATE_POST_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

const getOnePost = (id) => async (dispatch) => {
  try {
    const response = await GetOnePost(id)
    dispatch({ type: 'GET_ONE_POST_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'GET_ONE_POST_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

const updatePost = (id, data) => async (dispatch) => {
  try {
    const response = await UpdatePost(id, data)
    dispatch({ type: 'UPDATE_POST_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'UPDATE_POST_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

const deletePost = (id) => async (dispatch) => {
  try {
    const response = await DeletePost(id)
    dispatch({ type: 'DELETE_POST_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'DELETE_POST_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

const resetSearchPost = () => ({
  type: 'SEARCH_POST_RESET',
})

export {
  searchPost,
  searchPostByUser,
  createPost,
  getOnePost,
  updatePost,
  deletePost,
  resetSearchPost,
}
