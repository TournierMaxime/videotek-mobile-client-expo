import { videotekImportApi as http } from "./axios.js"

const SearchArticles = (lang) => {
  return http.post(`/articles/search?lang=${lang}`)
}

const GetOneArticle = (articleId) => {
  return http.get(`/articles/${articleId}`)
}

export { SearchArticles, GetOneArticle }
