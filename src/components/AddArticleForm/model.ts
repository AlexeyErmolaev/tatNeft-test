import { attach, createEffect, createEvent, createStore, forward, guard, sample } from "effector";
import { $articles, IArticle } from "../ArticleList/model";

//Events
export const changeTheme = createEvent<string>()
export const changeTitle = createEvent<string>()
export const changeDescription = createEvent<string>()
export const changeAuthor = createEvent<string>()
export const updateArticle = createEvent<IArticle>()
export const resetStores = createEvent()
const changeFormValid = createEvent<boolean>()
const changeTitleError = createEvent<string | null>()
const changeDescriptionError = createEvent<string | null>()
const changeAuthorError = createEvent<string | null>()
const changeThemeError = createEvent<string | null>()
const resetThemeError = createEvent()
const resetTitleError = createEvent()
const resetDescriptionError = createEvent()
const resetAuthorError = createEvent()

//Stores
export const $theme = createStore<string>('').reset(resetStores)
export const $title = createStore<string>('').reset(resetStores)
export const $description = createStore<string>('').reset(resetStores)
export const $author = createStore<string>('').reset(resetStores)
export const $themeError = createStore<string | null>(null).reset([resetStores, resetThemeError])
export const $titleError = createStore<string | null>(null).reset([resetStores, resetTitleError])
export const $descriptionError = createStore<string | null>(null).reset([resetStores, resetDescriptionError])
export const $authorError = createStore<string | null>(null).reset([resetStores, resetAuthorError])
export const $formValid = createStore<boolean>(false).reset(resetStores)

//Effects
const validateFx = createEffect<{theme: string, title: string, description: string, author: string}, void>(async ({theme, title, description, author}) => {
  !theme && changeThemeError('Поле обязательно для заполнения')
  !title && changeTitleError('Поле обязательно для заполнения')
  !description && changeDescriptionError('Поле обязательно для заполнения')
  !author && changeAuthorError('Поле обязательно для заполнения')
})
const changeThemeFx = createEffect(() => {
  resetThemeError()
})
const changeTitleFx = createEffect(() => {
  resetTitleError()
})
const changeDescriptionFx = createEffect(() => {
  resetDescriptionError()
})
const changeAuthorFx = createEffect(() => {
  resetAuthorError()
})

//Listeners
$theme.on(changeTheme, (_, theme) => theme)
$title.on(changeTitle, (_, title) => title)
$description.on(changeDescription, (_, description) => description)
$author.on(changeAuthor, (_, author) => author)
$formValid.on(changeFormValid, (_, isValid) => isValid)
$themeError.on(changeThemeError, (_, themeError) => themeError)
$titleError.on(changeTitleError, (_, titleError) => titleError)
$descriptionError.on(changeDescriptionError, (_, descriptionError) => descriptionError)
$authorError.on(changeAuthorError, (_, authorError) => authorError)

sample({
  clock: updateArticle,
  source: {articles: $articles, theme: $theme, title: $title, description: $description, author: $author},
  fn: ({articles}, data) => {
    if (data.id === -1) {
      data.id = articles[articles.length - 1].id + 1
      return [...articles, data]
    } else {
      const articleIndex = articles.findIndex((article) => article.id === data.id)
      if (articleIndex !== -1) {
        articles.splice(articleIndex, 1, data)
        return articles
      } else return [...articles, data]
    }
  },
  filter: ({theme, title, description, author}) => {
    if (!theme || !title || !description || !author) {
      return false
    } else return true
  },
  target: $articles
})

forward({
  from: updateArticle,
  to: validateFx
})
forward({
  from: changeTheme,
  to: changeThemeFx
})
forward({
  from: changeTitle,
  to: changeTitleFx
})
forward({
  from: changeDescription,
  to: changeDescriptionFx
})
forward({
  from: changeAuthor,
  to: changeAuthorFx
})