import { videotekImportApi as http } from "./axios"

const SearchArticles = (lang: string) => {
  return http.post(`/articles/search?lang=${lang}`)
}

const GetOneArticle = (articleId: string) => {
  return http.get(`/articles/${articleId}`)
}

export { SearchArticles, GetOneArticle }
