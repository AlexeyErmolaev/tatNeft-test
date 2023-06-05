import { createEvent, createStore, sample } from "effector";
import { $articles, IArticle } from "../ArticleList/model";

export const $foundedArticles = createStore<IArticle[]>([])
export const $matchText = createStore<string>('')

export const changeMatchText =  createEvent<string>()
export const handleSearchArticles =  createEvent<void>()

$matchText.on(changeMatchText, (_, matchText) => matchText)

sample({
  clock: handleSearchArticles,
  source: {articles: $articles, matchText: $matchText},
  fn: ({articles, matchText}) => {
    if (!matchText) {
      return articles
    } else {
      return articles.filter(article => article.title.includes(matchText))
    }
  },
  target: $foundedArticles
})