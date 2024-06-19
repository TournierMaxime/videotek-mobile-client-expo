import { videotekApi as http } from "./axios"

const CreateRecommendation = (data: any) => {
  return http.post(`/recommendations`, data, { withCredentials: true })
}

const GetOneRecommendation = (recommendationId: string, userId: string) => {
  return http.get(`/recommendations/${recommendationId}/user/${userId}`, {
    withCredentials: true,
  })
}

const DeleteRecommendation = (recommendationId: string, userId: string) => {
  return http.delete(`/recommendations/${recommendationId}/user/${userId}`, {
    withCredentials: true,
  })
}

export { CreateRecommendation, GetOneRecommendation, DeleteRecommendation }
