import { giphyApi as http } from './axios.js'

const SearchCategory = (filters) => {
  return http.post(`/category/search`, {}, { params: filters })
}

const SearchGifs = (filters) => {
  return http.post(`/gifs/search`, {}, { params: filters })
}

const GetOneGif = (gifId) => {
  return http.get(`/gifs/${gifId}`)
}

export {
  SearchCategory,
  SearchGifs,
  GetOneGif
}
