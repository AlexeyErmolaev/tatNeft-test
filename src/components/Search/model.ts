import { createEffect, createEvent, createStore, forward, sample } from "effector";
import { $articles, IArticle } from "../ArticleList/model";

export const $foundedArticles = createStore<IArticle[]>([])
export const $matchText = createStore<string>('')
export const $submited = createStore<boolean>(false)
export const $searchByTitleActive = createStore<boolean>(true)
export const $searchByThemeActive = createStore<boolean>(false)

export const changeSearchByTitle = createEvent()
export const changeSearchByTheme = createEvent()
export const changeMatchText = createEvent<string>()
export const handleSearchArticles = createEvent<void>()

$searchByTitleActive.on(changeSearchByTitle, (bool) => !bool)
$searchByThemeActive.on(changeSearchByTheme, (bool) => !bool)
$matchText.on(changeMatchText, (_, matchText) => matchText)

sample({
  clock: handleSearchArticles,
  source: {articles: $articles, matchText: $matchText, searchByTitleActive: $searchByTitleActive, searchByThemeActive: $searchByThemeActive},
  fn: ({articles, matchText, searchByTitleActive, searchByThemeActive}) => {
    if (!matchText) {
      return []
    } else {
      if (searchByTitleActive) {
        return articles.filter(({title}) => title.toLocaleLowerCase().includes(matchText.toLocaleLowerCase()))
      } else if (searchByThemeActive) {
        return articles.filter(({theme}) => theme.toLocaleLowerCase().includes(matchText.toLocaleLowerCase()))
      } else return articles.filter(({title, theme}) => title.toLocaleLowerCase().includes(matchText.toLocaleLowerCase()) || theme.toLocaleLowerCase().includes(matchText.toLocaleLowerCase()))
    }
  },
  target: $foundedArticles
})

const changeSubmited = createEvent<boolean>()
const submitFx = createEffect((data: any) => {
  if (data === undefined) {
    changeSubmited(true)
  } else changeSubmited(false)
})
$submited.on(changeSubmited, (_, submited) => submited)
forward({
  from: changeMatchText,
  to: submitFx
})
forward({
  from: handleSearchArticles,
  to: submitFx
})