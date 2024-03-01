import { videotekApi as http } from "./axios.js";

const CreateRecommendation = (data) => {
  return http.post(`/recommendations`, data, { withCredentials: true })
}

const GetOneRecommendation = (recommendationId) => {
  return http.get(`/recommendations/${recommendationId}`, { withCredentials: true })
}

const DeleteRecommendation = (recommendationId) => {
  return http.delete(`/recommendations/${recommendationId}`, { withCredentials: true })
}

export { CreateRecommendation, GetOneRecommendation, DeleteRecommendation }
