import { videotekApi as http } from "./axios.js";

const CreateRecommendation = (data) => {
  return http.post(`/recommendations`, data, { withCredentials: true })
}

const GetOneRecommendation = (recommendationId, userId) => {
  return http.get(`/recommendations/${recommendationId}/user/${userId}`, { withCredentials: true })
}

const DeleteRecommendation = (recommendationId, userId) => {
  return http.delete(`/recommendations/${recommendationId}/user/${userId}`, { withCredentials: true })
}

export { CreateRecommendation, GetOneRecommendation, DeleteRecommendation }
