import { Outlet, useNavigate } from "react-router-dom"
import { Icons } from "../../icons/Icons"
import './header.scss'

export const Header = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="header">
        <div onClick={() => navigate('/articles/add')} className="add-article">Добавить статью</div>
        <div onClick={() => navigate('/search')} title="Поиск">
          {Icons('search')}
        </div>
      </div>
      <Outlet />
    </>
  )
}