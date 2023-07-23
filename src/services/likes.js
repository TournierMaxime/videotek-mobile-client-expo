import { videotekApi as http } from './axios.js'

const SearchLikes = (userId, filters) => {
  return http.post(`/likes/${userId}/search`, {}, { params: filters })
}

const CreateLike = (data) => {
  return http.post('/likes/new', data, {
    withCredentials: true,
  })
}

const GetOneLikePost = (userId, postId) => {
  return http.get(`/likes/user/${userId}/like/post/${postId}`, {
    withCredentials: true,
  })
}

const GetOneLikeComment = (userId, commentId) => {
    return http.get(`/likes/user/${userId}/like/comment/${commentId}`, {
      withCredentials: true,
    })
  }

  const GetOneLikeCritic = (userId, criticId) => {
    return http.get(`/likes/user/${userId}/like/critic/${criticId}`, {
      withCredentials: true,
    })
  }

const DeleteLike = (likeId) => {
  return http.delete(`/likes/${likeId}`, {
    withCredentials: true,
  })
}

export {
  SearchLikes,
  CreateLike,
  GetOneLikePost,
  GetOneLikeComment,
  GetOneLikeCritic,
  DeleteLike
}
