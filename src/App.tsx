import React from 'react';
import { ArticleList } from './components/ArticleList/ArticleList';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Article } from './components/Article/Article';
import { AddArticleForm } from './components/AddArticleForm/AddArticleForm';
import { Header } from './components/Header/Header';
import { Search } from './components/Search/Search';
import './App.scss';


function App() {
  return (
    <div className='App'>
      <div className='app-container'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Header />}>
              <Route path="/articles" element={<ArticleList />} />
              <Route path="/articles/:id" element={<Article />} />
              <Route path="/articles/add" element={<AddArticleForm />} />
              <Route path="/articles/edit/:id" element={<AddArticleForm />} />
              <Route path="/search" element={<Search />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App;
