import { useParams } from "react-router-dom"
import './article.scss'
import { useEffect } from "react"
import { $addCommentText, $comments, $foundedArticleById, addComment, changeAddCommentText, foundArticle } from "./model"
import { useList, useStore } from "effector-react"
import { Button } from "../Button/Button"

export const Article = () => {
  const { id } = useParams()
  const foundedArticleById = useStore($foundedArticleById)
  const addCommentText = useStore($addCommentText)

  const comments = useList($comments, (comment) => {
    const date = new Date(comment.timestamp)
    return (
      <li className="comment-container">
        <div className="comment-header flex">
          <div className="comment-author">{comment.author}</div>
          <time>{`${date.toDateString()} ${date.toLocaleTimeString()}`}</time>
        </div>
        <div className="comment-text">{comment.text}</div>
      </li>
      )
  })

  useEffect(() => {
    id && foundArticle(Number(id))
  }, [])
  return (
    <div className="article-page">
      <div className="article-card">
        <div className="article-card__header">
          <div className="author">{foundedArticleById?.author}</div>
          <div>{new Date(Number(foundedArticleById?.timestamp)).toDateString()}</div>
        </div>
        <h2 className="title">
          <span>{foundedArticleById?.title}</span>
        </h2>
        <div className="theme">{foundedArticleById?.theme}</div>
        <div className="description">{foundedArticleById?.description}</div>
      </div>
      <div className="article-comments">
        <h4>Комментарии</h4>
        <div className="add-comment-field flex input-field">
          <textarea onKeyUp={e => {
            e.key === 'Enter' && addComment()
          }} className="input" onChange={e => changeAddCommentText(e.target.value)} value={addCommentText} placeholder="Добавьте комментарий"/>
          <Button onClick={addComment} label='Добавить' />
        </div>
        <ul>{comments}</ul>
      </div>
    </div>
  )
}