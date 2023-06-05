import { createEvent, createStore, sample } from "effector";
import { $articles, IArticle } from "../ArticleList/model";

type Comment = {
  author: string,
  text: string,
  timestamp: number
}

export const resetCommentsStores = createEvent()

export const $foundedArticleById = createStore<IArticle | null>(null)
export const $comments = createStore<Comment[]>([]).reset(resetCommentsStores)
export const $addCommentText = createStore<string>('').reset(resetCommentsStores)

export const foundArticle = createEvent<number>()
export const addComment = createEvent<void>()
export const changeAddCommentText = createEvent<string>()

$addCommentText.on(changeAddCommentText, (_, text) => text)

sample({
  clock: addComment,
  source: {comments: $comments, addCommentText: $addCommentText},
  fn: ({comments, addCommentText}) => {
    resetCommentsStores()
    return [...comments, {
      author: 'Alexey Ermolaev',
      text: addCommentText,
      timestamp: new Date().getTime()
    }]
  },
  target: $comments
})

sample({
  clock: foundArticle,
  source: $articles,
  fn: (articles: IArticle[], id: number) => {
    return articles.find(article => article.id === id) || null
  },
  target: $foundedArticleById
})