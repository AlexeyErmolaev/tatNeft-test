import { useNavigate } from "react-router-dom"
import './card.scss'
import { Button } from "../Button/Button";
import { IArticle, handleDeleteArticle } from "../ArticleList/model";

type CardProps = {
  article: IArticle;
}

export const Card = ({article}: CardProps) => {
  const navigate = useNavigate()
  const articleLink = `/articles/${article.id}`

  const handleRemove = (id: number) => {
    handleDeleteArticle(id)
  }

  return(
  <div className="article-card">
    <div className="article-card__header">
      <div className="author">{article.author}</div>
      <div>{new Date(article.timestamp).toDateString()}</div>
    </div>
    <h2>
      <span className="title" onClick={() => navigate(articleLink)}>{article.title}</span>
    </h2>
    <div className="theme">{article.theme}</div>
    <div className="description">{article.description.slice(0, 150)}</div>
    <div className="flex flex__spread_x">
      <Button className="margin-right-min" onClick={() => navigate(articleLink)} label='Читать' />
      <div className="flex">
        <Button className='margin-right-min' onClick={() => navigate(`/articles/edit/${article.id}`)} label='Редактировать' />
        <Button className='delete-button' onClick={() => handleRemove(article.id)} label='Удалить' />
      </div>
    </div>
  </div>
  )
}