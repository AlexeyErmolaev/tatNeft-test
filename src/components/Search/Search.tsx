import { Icons } from '../../icons/Icons'
import { Card } from '../Card/Card'
import './search.scss'
import { useStore } from 'effector-react'
import { $foundedArticles, changeMatchText, handleSearchArticles } from './model'

export const Search = () => {
  const foundedArticles = useStore($foundedArticles)
  
  return (
    <>
    <div className='search-container'>
      <div className='search-field'>
        <input onChange={e => changeMatchText(e.target.value)} className='input' placeholder='Поиск' />
        <div className='search-icon' onClick={() => handleSearchArticles()} title="Поиск">
          {Icons('search')}
        </div>
      </div>
    </div>
    {foundedArticles.map(article => {
        return <Card article={article} />
      })
    }
    </>
  )
}