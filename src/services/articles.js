import { videotekImportApi as http } from "./axios.js"

const SearchArticles = () => {
  return http.post("/articles/search")
}

const GetOneArticle = (articleId) => {
  return http.get(`/articles/${articleId}`)
}

export { SearchArticles, GetOneArticle }
