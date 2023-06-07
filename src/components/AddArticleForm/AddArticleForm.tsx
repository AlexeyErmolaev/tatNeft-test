import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../Button/Button'
import './addArticleForm.scss'
import { $author, $authorError, $description, $descriptionError, $formValid, $theme, $themeError, $title, $titleError, changeAuthor, changeDescription, changeTheme, changeTitle, resetStores, updateArticle } from './model'
import { useStore } from 'effector-react'
import { $foundedArticleById, foundArticle } from '../Article/model'

export const AddArticleForm = () => {
  const { id } = useParams()

  const theme = useStore($theme)
  const title = useStore($title)
  const description = useStore($description)
  const author = useStore($author)
  const foundedArticleById = useStore($foundedArticleById)
  const themeError = useStore($themeError)
  const titleError = useStore($titleError)
  const descriptionError = useStore($descriptionError)
  const authorError = useStore($authorError)
  const formValid = theme && title && description && author

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
    if (formValid) {
      navigate('/articles')
    }
  }

  return (
    <div className="article-form">
      <div className="theme form-input">
        <p className='input-label'>Тема</p>
        <input value={theme} onChange={e => changeTheme(e.target.value)} className='input' required/>
        {themeError && <span className='input-error'>{themeError}</span>}
      </div>
      <div className="title form-input">
        <p className='input-label'>Заголовок</p>
        <input value={title} onChange={e => changeTitle(e.target.value)} className='input' required/>
        {titleError && <span className='input-error'>{titleError}</span>}
      </div>
      <div className="description form-input">
        <p className='input-label'>Текст статьи</p>
        <textarea value={description} onChange={e => changeDescription(e.target.value)}  required/>
        {descriptionError && <span className='input-error'>{descriptionError}</span>}
      </div>
      <div className="author form-input">
        <p className='input-label'>Автор</p>
        <input value={author} onChange={e => changeAuthor(e.target.value)} className='input' required/>
        {authorError && <span className='input-error'>{authorError}</span>}
      </div>
      <Button onClick={() => handleAdd()} label={`${id ? 'Сохранить' : 'Создать'}`} />
    </div>
  )
}