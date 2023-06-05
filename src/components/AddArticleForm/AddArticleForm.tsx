import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../Button/Button'
import './addArticleForm.scss'
import { $author, $description, $theme, $title, changeAuthor, changeDescription, changeTheme, changeTitle, resetStores } from './model'
import { useStore } from 'effector-react'
import { $foundedArticleById, foundArticle } from '../Article/model'
import { updateArticle } from '../ArticleList/model'

export const AddArticleForm = () => {
  const { id } = useParams()

  const theme = useStore($theme)
  const title = useStore($title)
  const description = useStore($description)
  const author = useStore($author)
  const foundedArticleById = useStore($foundedArticleById)

  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      foundArticle(Number(id))
      changeTitle(foundedArticleById?.title || '')
      changeDescription(foundedArticleById?.description || '')
      changeAuthor(foundedArticleById?.author || '')
      changeTheme(foundedArticleById?.theme || '')
    }
    return () => {
      resetStores()
    }
  }, [])
  const handleAdd = () => {
    updateArticle({
      id: Number(id) || -1,
      title: title,
      description: description,
      author: author,
      theme: theme,
      timestamp: new Date().getTime()
    })
    navigate('/articles')
  }

  return (
    <div className="article-form">
      <div className="theme form-input">
        <p className='input-label'>Тема</p>
        <input value={theme} onChange={e => changeTheme(e.target.value)} className='input' required/>
      </div>
      <div className="title form-input">
        <p className='input-label'>Заголовок</p>
        <input value={title} onChange={e => changeTitle(e.target.value)} className='input' required/>
      </div>
      <div className="description form-input">
        <p className='input-label'>Текст статьи</p>
        <textarea value={description} onChange={e => changeDescription(e.target.value)}  required/>
      </div>
      <div className="author form-input">
        <p className='input-label'>Автор</p>
        <input value={author} onChange={e => changeAuthor(e.target.value)} className='input' required/>
      </div>
      <Button onClick={() => handleAdd()} label={`${id ? 'Сохранить' : 'Создать'}`} />
    </div>
  )
}