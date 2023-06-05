import { createEvent, createStore } from "effector";

export const resetStores = createEvent()

//Stores
export const $theme = createStore<string>('').reset(resetStores)
export const $title = createStore<string>('').reset(resetStores)
export const $description = createStore<string>('').reset(resetStores)
export const $author = createStore<string>('').reset(resetStores)

//Events
export const changeTheme = createEvent<string>()
export const changeTitle = createEvent<string>()
export const changeDescription = createEvent<string>()
export const changeAuthor = createEvent<string>()

//Listeners
$theme.on(changeTheme, (_, theme) => theme)
$title.on(changeTitle, (_, title) => title)
$description.on(changeDescription, (_, description) => description)
$author.on(changeAuthor, (_, author) => author)