import { videotekImportApi as http } from "./axios.js"

const SearchArticles = (lang: string) => {
  return http.post(`/articles/search?lang=${lang}`)
}

const GetOneArticle = (articleId: string) => {
  return http.get(`/articles/${articleId}`)
}

export { SearchArticles, GetOneArticle }
