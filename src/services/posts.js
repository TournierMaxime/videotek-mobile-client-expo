import { videotekApi as http } from './axios.js'

const SearchPosts = (id, filters) => {
  return http.post(`/posts/search/${id}`, {}, { params: filters })
}

const SearchPostsByUser = (userId, filters) => {
  return http.post(`/posts/search/user/${userId}`, {
    params: {
      filters,
    },
    withCredentials: true,
  })
}

const GetOnePost = (id) => {
  return http.get(`/posts/${id}`)
}

const CreatePost = (data) => {
  return http.post('/posts/new', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  })
}

const UpdatePost = (id, data) => {
  return http.put(`/posts/${id}`, data, {
    withCredentials: true,
  })
}

const DeletePost = (id) => {
  return http.delete(`/posts/${id}`, {
    withCredentials: true,
  })
}

export {
  SearchPosts,
  CreatePost,
  DeletePost,
  UpdatePost,
  SearchPostsByUser,
  GetOnePost,
}
