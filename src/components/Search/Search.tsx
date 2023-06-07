import { Icons } from '../../icons/Icons'
import { Card } from '../Card/Card'
import './search.scss'
import { useStore } from 'effector-react'
import { $foundedArticles, $matchText, $searchByThemeActive, $searchByTitleActive, $submited, changeMatchText, changeSearchByTheme, changeSearchByTitle, handleSearchArticles } from './model'
import { Button } from '../Button/Button'

export const Search = () => {
  const foundedArticles = useStore($foundedArticles)
  const matchText = useStore($matchText)
  const submited = useStore($submited)
  const searchByTitleActive = useStore($searchByTitleActive)
  const searchByThemeActive = useStore($searchByThemeActive)
  
  return (
    <>
    <div className='search-container'>
      <div className='search-field'>
        <input onKeyUp={e => e.key === 'Enter' && handleSearchArticles()} onChange={e => changeMatchText(e.target.value)} className='input' placeholder='Поиск' />
        <div className='search-icon' onClick={() => handleSearchArticles()} title="Поиск">
          {Icons('search')}
        </div>
      </div>
      <div className='flex flex__x-center'>
        <p className='search-by'>Искать по:</p>
        <div className='checkbox margin-right-min'>
          <input type="checkbox" id="title" name="title" onChange={() => changeSearchByTitle()} checked={searchByTitleActive} />
          <label htmlFor="title">Заголовоку</label>
        </div>
        <div className='checkbox'>
          <input type="checkbox" id="theme" name="theme" onChange={() => changeSearchByTheme()} checked={searchByThemeActive} />
          <label htmlFor="theme">Теме</label>
        </div>
      </div>
    </div>
    {foundedArticles.map(article => {
        return <Card article={article} />
      })
    }
    {submited && foundedArticles.length === 0 && matchText &&
      'Не удалось ничего найти'
    }
    </>
  )
}