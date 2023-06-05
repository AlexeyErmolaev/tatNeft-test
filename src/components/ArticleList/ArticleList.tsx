import { useList, useStore } from 'effector-react'
import { $filteredArticles, $authorFilter, $themeFilter, changeAuthorFilter, changeDateFilter, changeThemeFilter, handleFilterArticles, $dateFilter, $articles, resetFiltersStores } from './model'
import { Button } from '../Button/Button'
import { Card } from '../Card/Card'
import './articleList.scss'
import { useEffect } from 'react'

export const ArticleList = () => {
  const themeFilter = useStore($themeFilter)
  const authorFilter = useStore($authorFilter)
  const dateFilter = useStore($dateFilter)
  const hasSomeFilter = themeFilter || authorFilter || dateFilter
  const articlesList = useList(hasSomeFilter ? $filteredArticles : $articles, (article) => (
    <Card article={article} />
  ))

  useEffect(() => {
    return () => {
      resetFiltersStores()
    }
  }, [])


  return (
    <div className='articles-container flex'>
      <div className='article-list'>
        {articlesList}
      </div>
      <form className='articles-filters' onKeyUp={e => e.key === 'Enter' && handleFilterArticles()}>
        <p className='input-label'>Фильтры</p>
        <div className='articles-filters__item form-input'>
          <p className='input-label'>Тема</p>
          <input value={themeFilter} className='input' onChange={e => changeThemeFilter(e.target.value)} placeholder='' />
        </div>
        <div className='articles-filters__item form-input'>
          <p className='input-label'>Автор</p>
          <input value={authorFilter} className='input' onChange={e => changeAuthorFilter(e.target.value)} placeholder='' />
        </div>
        <div className='articles-filters__item form-input'>
          <p className='input-label'>Дата публикации</p>
          <input value={dateFilter} className='input' onChange={e => changeDateFilter(e.target.value)} placeholder='06.21.2023' />
        </div>
        <div className=''>
          <Button label='Показать' onClick={handleFilterArticles} />
        </div>
      </form>
    </div>
  )
}
